package kr.or.lx.rcic.frmwrk.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.List;


/*****************************************************************************
 *
 *  @packageName : kr.or.lx.rcic.frmwrk.util;
 *  @fileName : FileController.java
 *  @author : Hanwook Kim
 *  @since 2019. 12. 29.
 *  @version 1.0
 *  @see  :
 *  @revision : 2019. 12. 29.
 *
 *  <pre>
 *  << Modification Information >>
 *    DATE	           NAME			DESC
 *     -----------	 ----------   ---------------------------------------
 *      2019. 12. 29.     HanWook Kim      create FileController.java
 *  </pre>
 ******************************************************************************/
@Slf4j
@Controller
public class FileController {

	private String excelFilePath = "excel\\";
	private String filePath = "C:\\";

	/**
	 * File direct download.
	 *
	 * @param request the request
	 * @param response the response
	 * @throws Exception the exception
	 */
	@RequestMapping("/common/fileDirectDownload")
	public void fileDirectDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		//실제  디렉토리
		String realDir = filePath+excelFilePath;

		if(request.getParameter("f_realDir") != null && !request.getParameter("f_realDir").equals("")){
			realDir = request.getParameter("f_realDir");
		}
		
		//서버에 저장된 파일 이름 가져옴
		String saveFileName = request.getParameter("f_fileName");

		//실제  파일 이름 가져옴
		//String orgFileName = request.getParameter("orgFileName");

		//파일 풀경로 가져옴
		String fullFileName = realDir;

		//String fullFileName = request.getParameter("fullFileName");

		//파일을  orgFileName의 이름으로 다운로드 함
		File f = new File(fullFileName);

		if (f.exists()) {

			// 파일명 인코딩 처리
			String header = getBrowser(request);
			if (header.contains("MSIE")) {
				String docName = URLEncoder.encode(saveFileName,"EUC-KR").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");
			} else if (header.contains("Firefox")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			} else if (header.contains("Opera")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			} else if (header.contains("Chrome")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			}
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Transfer-Encoding", "binary;");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;");

			byte[] buffer = new byte[1024];
			BufferedInputStream ins = new BufferedInputStream(new FileInputStream(f));
			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
			
			try {
				int read = 0;
				while ((read = ins.read(buffer)) != -1) {
					outs.write(buffer, 0, read);
				}
				outs.close();
				ins.close();
			} catch (IOException e) {
				log.info("$$$$$$$$$$$$$$$$$  : FILE DOWNLOAD ERROR : $$$$$$$$$$$$$$$$$$");
			} finally {
				if(outs!=null) {
					outs.close();
				}
				if(ins!=null) {
					ins.close();
				}
			}
		} else {
			throw new Exception("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다.");
		}
	}
	
	
	
	/**
	 * File direct download2.
	 *
	 * @param 
	 * @param response the response
	 * @throws Exception the exception
	 */
	public void  firmwareDownload(byte[] bytes, String FileName, HttpServletRequest request, HttpServletResponse response) throws Exception {
 
		    String saveFileName = FileName;

			// 파일명 인코딩 처리
			String header = getBrowser(request);
			if (header.contains("MSIE")) {
				String docName = URLEncoder.encode(saveFileName,"EUC-KR").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");
			} else if (header.contains("Firefox")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			} else if (header.contains("Opera")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			} else if (header.contains("Chrome")) {
				String docName = new String(saveFileName.getBytes("EUC-KR"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");
			}
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Transfer-Encoding", "binary;");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;");

			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());

			try {
				outs.write(bytes);
				outs.close();
			} catch (IOException e) {
				log.info("$$$$$$$$$$$$$$$$$  : FILE DOWNLOAD ERROR : $$$$$$$$$$$$$$$$$$");
			} finally {
				if(outs!=null) {
					outs.close();
				}
			}
	}

	public static boolean makeDirectories(String path) {
		
		if( StringUtils.isBlank(path)) {
			throw new RuntimeException("Given path parameter is blank. Thus can't make directory.");
		}

		File f = new File(path);

		if (f.exists()) {
			return false;
		} else {
			f.mkdirs();
			return true;
		}
	}
	
	@SuppressWarnings("unused")
	private boolean deleteFile(File file) {
		
		boolean isRemove = false;
		if( file.exists() ){
            if(file.delete()){
            	isRemove = true;
            }else{
            	isRemove = false;
            }
        }else{
        	isRemove = false;
        }
		return isRemove;
	}

	private String getBrowser(HttpServletRequest request) {

		String header =request.getHeader("User-Agent");

		if (header.contains("MSIE")) {

			return "MSIE";

		} else if(header.contains("Chrome")) {

			return "Chrome";

		} else if(header.contains("Opera")) {

			return "Opera";
		}
		return "Firefox";

	}
	
	public String fileToString(File file) throws IOException {

	    String fileString = new String();
	    FileInputStream inputStream =  null;
	    ByteArrayOutputStream byteOutStream = null;

	    try {

	        inputStream = new FileInputStream(file);
			byteOutStream = new ByteArrayOutputStream();
	
			int len = 0;
			byte[] buf = new byte[1024];
		        while ((len = inputStream.read(buf)) != -1) {
		             byteOutStream.write(buf, 0, len);
		        }
		        byte[] fileArray = byteOutStream.toByteArray();
		         Encoder en = java.util.Base64.getEncoder();
		        fileString = new String(en.encode(fileArray));
		        
		    } catch (IOException e) {
	
		    	CmmnUtil.setLog(e.getMessage());
	
		    } finally {
		    	inputStream.close();
		        byteOutStream.close();
	    }
	    return fileString;
	}

	public byte[] read(File file) throws IOException {
		
	    ByteArrayOutputStream ous = null;
	    InputStream ios = null;
	    try {
	        byte[] buffer = new byte[4096];
	        ous = new ByteArrayOutputStream();
	        ios = new FileInputStream(file);
	        int read = 0;
	        while ((read = ios.read(buffer)) != -1) {
	            ous.write(buffer, 0, read);
	        }
	    }finally {
	        try {
	            if (ous != null)
	                ous.close();
	        } catch (IOException e) {
	        }

	        try {
	            if (ios != null)
	                ios.close();
	        } catch (IOException e) {
	        }
	    }
	    return ous.toByteArray();
	}
	
	public static HashMap cellData(XSSFSheet sheet, int rowindex, int columnindex, String sheetname, List headerList, HashMap getMap ) {
		log.info("getSheetName"+sheet.getSheetName());
		//행을읽는다
		log.info("rowindex"+rowindex);
        XSSFRow row=sheet.getRow(rowindex);
        if(row !=null){
            //셀의 수
            int cells=row.getPhysicalNumberOfCells();
            
            
            for(columnindex=0; columnindex<=cells; columnindex++){
                //셀값을 읽는다
                XSSFCell cell=row.getCell(columnindex);
                

                String value="";
                //셀이 빈값일경우를 위한 널체크
                if(cell==null){
                    continue;
                }else{
                	cell.setCellType( XSSFCell.CELL_TYPE_STRING );
                    //타입별로 내용 읽기
                    switch (cell.getCellType()){
                    case XSSFCell.CELL_TYPE_FORMULA:
                        value=cell.getCellFormula();
                        break;
                    case XSSFCell.CELL_TYPE_NUMERIC:
                        value=cell.getNumericCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_STRING:
                        value=cell.getStringCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_BLANK:
                        value=cell.getBooleanCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_ERROR:
                        value=cell.getErrorCellValue()+"";
                        break;
                    }
                }
                
                if(rowindex == 1) {
                	headerList.add(value);
                }else {
                	
                	getMap.put(headerList.get(columnindex).toString().toLowerCase().replaceAll(" ", ""), value);
                
                }
            }
        }else {
        	getMap.replace("status", false);
        }
        
        return getMap;
	}
	
	
	public static List headerData(XSSFSheet sheet, int rowindex, int columnindex, String sheetname, List headerList ) {
		
		//행을읽는다
        XSSFRow row=sheet.getRow(rowindex);
        
        if(row !=null){
            //셀의 수
            int cells=row.getPhysicalNumberOfCells();
            
            for(columnindex=0; columnindex<=cells; columnindex++){
                //셀값을 읽는다
                XSSFCell cell=row.getCell(columnindex);

                String value="";
                //셀이 빈값일경우를 위한 널체크
                if(cell==null){
                    continue;
                }else{
                    //타입별로 내용 읽기
                    switch (cell.getCellType()){
                    case XSSFCell.CELL_TYPE_FORMULA:
                        value=cell.getCellFormula();
                        break;
                    case XSSFCell.CELL_TYPE_NUMERIC:
                        value=cell.getNumericCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_STRING:
                        value=cell.getStringCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_BLANK:
                        value=cell.getBooleanCellValue()+"";
                        break;
                    case XSSFCell.CELL_TYPE_ERROR:
                        value=cell.getErrorCellValue()+"";
                        break;
                    }
                }
                
                if(rowindex == 1) {
                	headerList.add(value.toString().toLowerCase().replaceAll(" ", ""));
                }
                
            }
            
            
            

        }// row
        
        return headerList;
	}
	
	public File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException 
	{
		   File convFile = new File(multipart.getOriginalFilename());
		    convFile.createNewFile(); 
		    FileOutputStream fos = new FileOutputStream(convFile); 
		    fos.write(multipart.getBytes());
		    fos.close(); 
		    return convFile;
	}
	
}
