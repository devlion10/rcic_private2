package kr.or.lx.rcic.modules.board.controller;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.frmwrk.web.BaseController;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.BadRequestException;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 *  게시판의 첨부파일정보를 관리한다.  */
@Controller
@Slf4j
@RequestMapping("/rcic")
public class BbsAtchFileController extends BaseController {

    @Autowired
    private BbsAtchFileService bbsAtchFileService;

    /**
     * 게시판 첨부파일 다운로드
     * @param fileId
     * @param response
     * @throws Exception
     */
    @RequestMapping("/assets/attachment/{id}")
    public void getBbsAtchFile(@PathVariable("id") Long fileId, HttpServletResponse response) throws Exception {
        Map<String, Object> param = new HashMap<>();
        param.put("id", fileId);
        BbsAtchFile fileInfo = bbsAtchFileService.getBbsAtchFile(param);

        if (fileInfo == null) {
            log.warn("존재하지 않는 파일 정보를 요청하였음. 파일ID: {}", fileId);
            throw new BadRequestException("존재하지 않는 파일ID:" + fileId);
        }

        String filePath = fileInfo.getAtchFileLc();
        if (!filePath.endsWith("/")) filePath += "/";
        String fullFilePath = filePath + fileInfo.getAtchFileNm();

        File localFile = new File(fullFilePath);
        if (localFile.exists() == false) {
            CmmnUtil.setLog("서버에 파일이 존재하지 않음");
            throw new RuntimeException("서버에 파일이 존재하지 않습니다.");
        }

        String downloadFileName = fileInfo.getOrginlFileNm();
        String encodedFileName = new String(downloadFileName.getBytes("UTF-8"), "ISO-8859-1");

        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");

        OutputStream out = response.getOutputStream();
        InputStream fis = null;
        try {
            fis = new FileInputStream(localFile);
            FileCopyUtils.copy(fis, out);
        } catch (Exception e) {
        	CmmnUtil.setLog(e.getMessage());
        } finally {
            IOUtils.closeQuietly(fis);
        }

        out.flush();
    }

//    /**
//     * 단건 조회
//     */
//    @RequestMapping("/bbsAtchFile/getBbsAtchFile")
//    @ResponseBody
//    public BbsAtchFile getBbsAtchFile(HttpServletRequest request, @RequestParam Map params) throws Exception {
//        SimpleData simpleData = getSimpleData(request);
//        return bbsAtchFileService.getBbsAtchFile(simpleData);
//    }
//
//    /**
//     * 목록 조회
//     */
//    @RequestMapping("/bbsAtchFile/getBbsAtchFileList")
//    @ResponseBody
//    public Map<String, Object> getBbsAtchFileList(HttpServletRequest request) throws Exception {
//        return bbsAtchFileService.getBbsAtchFileList(request);
//    }
//
//    /**
//     * 등록
//     */
//    @PostMapping("/bbsAtchFile/insertBbsAtchFile")
//    @ResponseBody
//    public int insertBbsAtchFile(HttpServletRequest request, @RequestBody BbsAtchFile bbsAtchFile) throws Exception {
//        return bbsAtchFileService.saveBbsAtchFile(bbsAtchFile);
//    }
//
//    /**
//     * 수정
//     */
//    @PostMapping("/bbsAtchFile/updateBbsAtchFile")
//    @ResponseBody
//    public int updateBbsAtchFile(HttpServletRequest request, @RequestBody BbsAtchFile bbsAtchFile) throws Exception {
//        return bbsAtchFileService.saveBbsAtchFile(bbsAtchFile);
//    }
//
//    /**
//     * 동적 수정
//     */
//    @PostMapping("/bbsAtchFile/patchBbsAtchFile")
//    @ResponseBody
//    public int patchBbsAtchFile(HttpServletRequest request, @RequestBody BbsAtchFile bbsAtchFile) throws Exception {
//        return bbsAtchFileService.saveBbsAtchFile(bbsAtchFile);
//    }
//
//    /**
//     * 삭제
//     */
//    @PostMapping("/bbsAtchFile/deleteBbsAtchFile")
//    @ResponseBody
//    public int deleteBbsAtchFile(HttpServletRequest request, @RequestBody BbsAtchFile bbsAtchFile) throws Exception {
//        return bbsAtchFileService.deleteBbsAtchFile(bbsAtchFile);
//    }

}
