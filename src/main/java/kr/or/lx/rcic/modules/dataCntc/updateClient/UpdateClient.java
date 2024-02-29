package kr.or.lx.rcic.modules.dataCntc.updateClient;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.ServletContext;

import org.apache.catalina.util.ParameterMap;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.go.ads.client.ADSReceiver;
import kr.go.ads.client.ADSUtils;
import kr.go.ads.client.ReceiveData;
import kr.go.ads.client.ReceiveDatas;
import kr.or.lx.rcic.modules.dataCntc.service.DataCntcService;


@Component
public class UpdateClient {

    @SuppressWarnings("unused")
	@Autowired
	public static DataCntcService dataCntcService;
    
    @Autowired
    public static ServletContext servletContext;
    
	 public static void main(String[] args){
		 UpdateClient uc = new UpdateClient();
		 try{
			 uc.getAddrInfo();
		 }catch(Exception ex){
			 ex.printStackTrace();
		 }
	 }
	/**
	 * 
	 * <pre>
	 * 1. 개요        : 
	 * 2. 처리내용    : 도로명 주소 연계를 통한 zip파일 생성
	 * </pre>
	 * @Method   : getAddrInfo
	 * @date     : 2022. 5. 19
	 * @author   : yoonhan
	 * @history  : 
	 *	-----------------------------------------------------------------------
	 *	변경일				작성자						변경내용  
	 *	----------- ------------------- ---------------------------------------
	 *	2022. 5. 19            yoonhan
	 *	-----------------------------------------------------------------------
	 * </pre>
	 */
	public static void getAddrInfo(){
		 
		 LocalDate now = LocalDate.now(); 
		 String req_date = now.toString();
		 req_date = req_date.replaceAll("-", "");
		 System.out.println(req_date);
		 
		 ADSReceiver ads = new ADSReceiver(); // ADSReceiver 객체 생성
		 String app_key = "U01TX0FVVEgyMDIyMDUwMzEwNTMxMTExMjUyODU="; // 승인키 (신청시 발급된 승인키)
		 String date_gb = "D"; // 날짜 구분 (M: 월변동)
		 String retry_in = "Y"; // 재반영 요청 여부
		 String cntc_cd = "009021"; // 자료 요청 구분
		 String req_date_from = req_date; // 요청일자(From)
		 String req_date_to = ""; // 요청일자(To)
		 
		 String filePath = servletContext.getRealPath("/assets/data");
		 // 변동 자료를 저장할 파일경로를 설정합니다.
		 ads.setFilePath(filePath);
		 ads.setCreateDateDirectory(ADSUtils.YYMMDD);
		 
		 try {
			 // 변동자료 연계서비스 요청 및 응답데이터 확인
			 ReceiveDatas receiveDatas = ads.receiveAddr(app_key, date_gb, cntc_cd, retry_in, req_date_from, req_date_to);
			 
			 /* --------------------------------- 응답 결과 확인 --------------------------------- */
			 if(receiveDatas.getResult() != 0){
				 if(receiveDatas.getResult() == -1){
					 // 서버 접속 실패 : 잠시후 재 시도 하시기 바랍니다.
					 System.out.println("서버 접속 실패"); 
				 }
				 // 서버 페이지 오류 사항 확인
				 System.out.println("Result code : "+receiveDatas.getResult());
				 System.out.println("Response code : "+receiveDatas.getResCode());
				 System.out.println("Response Msg : "+receiveDatas.getResMsg());
				 return;
			 }
			 
			 // 서버 응답 확인
			 System.out.println("Response code : "+receiveDatas.getResCode()); // 응답코드
			 System.out.println("Response Msg : "+receiveDatas.getResMsg()); // 응답메시지
			 
			 if(!"P0000".equals(receiveDatas.getResCode())){
				 return;
			 }
			 /* --------------------------------- 응답 결과 완료 --------------------------------- */
			 
			 // 결과 데이터 정렬
			 ArrayList result = receiveDatas.getReceiveDatas(ADSUtils.UPDATE_ASC);
			 Iterator itr = result.iterator();
			 while(itr.hasNext()){
				 // 결과 데이터 건별 정보 확인
				 ReceiveData receiveData = (ReceiveData)itr.next();
				 System.out.print(" CNTC : ");
				 System.out.print(receiveData.getCntcCode());
				 System.out.print(" RES_CODE : ");
				 System.out.println(receiveData.getResCode());
				 
				 if(!"P0000".equals(receiveData.getResCode())){
					 // 해당 파일응답 에러. 특히 E1001 인경우, 해당 파일을 아직 생성하지 못한 응답으로 추후 재시도 필요.
					 System.out.println("해당파일에 대한 응답이 정상이 아니기에 재 요청 필요");
				 }else {
					 String folderName = req_date.substring(2,8);
					 String fileName = receiveData.getFileName();
					 System.out.println("fileName =" + fileName);
					 String fileFullPAth = filePath+"\\"+folderName+"\\";
					 //연계가 끝난 zip 파일 해제
					 unZip(fileFullPAth,fileName);
				 }
			 }
		 } catch (Exception e) {
			 e.printStackTrace();
		 }
	}
	 
 	/**
	 * 
	 * <pre>
	 * 1. 개요        : 
	 * 2. 처리내용    : 연계를 통해 생성된 zip파일 압축 해제
	 * </pre>
	 * @Method   : unZip
	 * @date     : 2022. 5. 19
	 * @author   : yoonhan
 	 * @throws Exception 
	 * @history  : 
	 *	-----------------------------------------------------------------------
	 *	변경일				작성자						변경내용  
	 *	----------- ------------------- ---------------------------------------
	 *	2022. 5. 19            yoonhan
	 *	-----------------------------------------------------------------------
	 * </pre>
	 */
	public static void unZip(String filePath, String FileName) throws Exception{
		 
		try {
			String filFullepath = filePath+FileName;
			FileInputStream fin = new FileInputStream(filFullepath);
			ZipInputStream zin = new ZipInputStream(fin);
			ZipEntry entry = null;
			try {
				while ((entry = zin.getNextEntry()) != null){
					String fileName = entry.getName();
					System.out.println(entry.getName() + "에  압축(.zip)을 해제합니다.");
					OutputStream zout = new FileOutputStream(filePath+entry.getName());
					byte[] buf = new byte[1024];
					int len;
					while ((len = zin.read(buf)) > 0) {
						zout.write(buf, 0, len);
					}
					zin.closeEntry();
					zout.close();
					fileInsert();
					fileRead(filePath, fileName);
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					zin.close();
				} catch (IOException e) {
		          e.printStackTrace();
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	 public static void fileRead(String filePath, String fileName) throws Exception{

		 BufferedReader reader = new BufferedReader(new InputStreamReader( new FileInputStream(filePath+fileName), "euc-kr"));

		 String str;
		 Map<String, String> paraMap = null;
		 
			 if(fileName.contains("JUSUIP")) {
				 
				 paraMap = new ParameterMap<String, String>();
				 
				 while ((str = reader.readLine()) != null) {
					 if(str.equals("No Data")) {
						 System.out.println(fileName+" 파일에 변동자료가 없습니다.");
						 break;
					 }
					 
					 String[] cntcCd = str.split("\\|");
					//이동사유 코드 31: 생성 
					 if(cntcCd[15].equals("C")) { 
						 
						 if(cntcCd[0].length()>0){
							 paraMap.put("sgg_cd",cntcCd[0] );
						 }//시군구 코드
						 if(cntcCd[5].length()>0){
							 paraMap.put("sido_nm",cntcCd[5] );
						 }//시도 명
						 if(cntcCd[6].length()>0){
							 paraMap.put("sgg_nm",cntcCd[6] );
						 }//시군구 명
						 if(cntcCd[7].length()>0){
							 paraMap.put("emd_cd",cntcCd[7] );
						 }//읍면동 코드
						 if(cntcCd[8].length()>0){
							 paraMap.put("emd_nm",cntcCd[8] );
						 }//읍면동 명
						 if(cntcCd[10].length()>0){
							 paraMap.put("rn",cntcCd[10] );
						 }
						 if(cntcCd[11].length()>0){
							 paraMap.put("rbp_cn",cntcCd[11] );
						 }//도로구간시점
						 if(cntcCd[12].length()>0){
							 paraMap.put("rep_cn",cntcCd[12] );
						 }//도로구간종점
						 
						 System.out.println("생성"); 
						 //paraMap.put("",cntcCd[13] );
					//이동사유 코드 34: 변동 
					 }else if(cntcCd[15].equals("U")){ 
						 System.out.println("변동");
						
					//이동사유 코드 63: 폐지 
					 }else if(cntcCd[15].equals("D")){
						//paraMap.put("RN",cntcCd[13]); 
						//DataCntcService.deleteRoadName(paraMap); 
						System.out.println("폐지");
					 }
				 }
				 reader.close();
			}
		 		 
	 }
	 
	 public static void fileInsert() throws Exception{
		 
		 
		 String filePath = "C:\\test\\202204\\";
		 String fileName = "intrvl_gwangju.txt";
		 
		 
		 BufferedReader reader = new BufferedReader(new InputStreamReader( new FileInputStream(filePath+fileName), "euc-kr"));
		 
		 String str;
		 Map<String, Object> paraMap = new HashMap<>();
		 //InsertParams insertParams = new InsertParams();
				 
		 	while ((str = reader.readLine()) != null) {
		 		String[] cntcCd = str.split("\\|");
		 		if(cntcCd[0].length()>0) {
		 			//insertParams.setSgg_cd((cntcCd[0]));
		 			//insertParams.setSido_cd(cntcCd[0].substring(0,2));
		 			paraMap.put("sgg_cd",cntcCd[0]);
		 			paraMap.put("sido_cd",cntcCd[0].substring(0,2));
		 		}
		 		if(cntcCd[5].length()>0) {
		 			//insertParams.setSido_nm(cntcCd[5]);
		 			paraMap.put("sido_nm",cntcCd[5]);
		 		}
		 		if(cntcCd[6].length()>0) {
		 			//insertParams.setSgg_nm(cntcCd[6]);
		 			paraMap.put("sgg_nm",cntcCd[6]);
		 		}
		 		if(cntcCd[7].length()>0) {
		 			//insertParams.setEmd_cd(cntcCd[7]);
		 			paraMap.put("emd_cd",cntcCd[7]);
		 		}
		 		if(cntcCd[8].length()>0) {
		 			//insertParams.setEmd_nm(cntcCd[8]);
		 			paraMap.put("emd_nm",cntcCd[8]);
		 		}
		 		if(cntcCd[10].length()>0) {
		 			//insertParams.setRn(cntcCd[10]);
		 			paraMap.put("rn",cntcCd[10]);
		 		}
		 		if(cntcCd[11].length()>0) {
		 			//insertParams.setRbp_cn(cntcCd[11]);
		 			paraMap.put("attr2",cntcCd[11]);
		 		}
		 		if(cntcCd[12].length()>0) {
		 			//insertParams.setRep_cn(cntcCd[12]);
		 			paraMap.put("attr3",cntcCd[12]);
		 		}
		 		paraMap.put("road_name_id",cntcCd[0]+cntcCd[1]+cntcCd[2]+cntcCd[3]);
		 		//insertParams.setRoad_name_id(cntcCd[0]+cntcCd[1]+cntcCd[2]+cntcCd[3]);
		 		//System.out.println(paraMap);
		 		try {
		 			dataCntcService.insertRoadName();
		 		}catch (Exception e) {
					System.out.println(e);
				}
		 		
		 	}
	 }
}
