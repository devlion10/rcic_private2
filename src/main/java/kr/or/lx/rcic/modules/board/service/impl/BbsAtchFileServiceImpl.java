package kr.or.lx.rcic.modules.board.service.impl;

import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.EgovMessageSource;
import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.BoardReferenceType;
import kr.or.lx.rcic.modules.board.entity.FileAttachableBoard;
import kr.or.lx.rcic.modules.board.mapper.BbsAtchFileMapper;
import kr.or.lx.rcic.modules.board.service.BbsAtchFileService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 *  게시판의 첨부파일정보를 관리한다.  */
@Service
@Slf4j
public class BbsAtchFileServiceImpl implements BbsAtchFileService {

    @Autowired
    private BbsAtchFileMapper bbsAtchFileMapper;

    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Value("#{contextProperties}")
    Properties prop = new Properties();


    @Transactional
    public void saveAttachFileList(FileAttachableBoard board) throws Exception {
        if (CollectionUtils.isEmpty(board.getAttachFileList())) return;

        String uploadDirectory = getFileSaveDirectory(board.getBoardRefType());
        File uploadDir = new File(uploadDirectory);
        uploadDir.mkdirs();

        for (MultipartFile multiFile : board.getAttachFileList()) {

            if (multiFile.getSize() == 0) continue;

            String originalFileName = multiFile.getOriginalFilename(); // 원본파일명
            String ext = FilenameUtils.getExtension(originalFileName);

            String newFileName = createNewFileName(board.getBoardRefType(), board.getPrimaryKey(), ext);

            File saveFile = new File(uploadDirectory + newFileName);
            multiFile.transferTo(saveFile);

            // 파일정보 저장
            BbsAtchFile atchFile = new BbsAtchFile();
            atchFile.setAtchFileLc(uploadDirectory);
            atchFile.setAtchFileNm(newFileName);
            atchFile.setOrginlFileNm(originalFileName);
            atchFile.setAtchFileSize(multiFile.getSize());
            atchFile.setRefrnBbscttTy(board.getBoardRefType().getCode());
            atchFile.setRefrnBbscttNo(board.getPrimaryKey());

            saveBbsAtchFile(atchFile);
        }
    }

    private String createNewFileName(BoardReferenceType type, Long pk, String ext) {
        String refType = type.toString().toLowerCase();
        String randomAlphabetic = RandomStringUtils.randomAlphabetic(20);
        String newFileName = String.format("%s_%d_%s.%s", refType, pk, randomAlphabetic, ext);
        return newFileName;
    }

    private String getFileSaveDirectory(BoardReferenceType refType) {
        String baseDirectory = prop.getProperty("uploadBaseDir");

        if (!baseDirectory.endsWith("/")) baseDirectory += "/";
        String dir = baseDirectory + refType.toString().toLowerCase() + "/";
        log.debug("{} file save directory: {}", refType, dir);
        return dir;
    }

    /**
     * 단건 조회
     */
    @Override
    public BbsAtchFile getBbsAtchFile(Map<String, Object> params) throws Exception {
        return bbsAtchFileMapper.getBbsAtchFile(params);
    }

    /**
     * 목록 조회
     */
    @Override
    public Map<String, Object> getBbsAtchFileList(HttpServletRequest request) throws Exception {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> retMap = new HashMap<String, Object>();
        resultMap.put("message", "success");
        String strParamList = CmmnUtil.deXss(CmmnUtil.checkNull(request.getParameter("paramList"), ""));
        if (strParamList.equals("")) {
            retMap.put("message", "failure");
            retMap.put("result", egovMessageSource.getMessage("_REQUIRED_MSG_REPEAT"));
            return retMap;
        }

        JSONArray paramList = JSONArray.fromObject(strParamList);
        HashMap<String, Object> param = new HashMap<String, Object>();
        param = CmmnUtil.convertJsonToObject(CmmnUtil.checkNull(paramList.getJSONObject(0), ""));

        int listCnt = param.get("listCnt") == null ? 10 : Integer.parseInt(String.valueOf(param.get("listCnt")));
        int currPage = param.get("currPage") == null ? 1 : Integer.parseInt(String.valueOf(param.get("currPage")));

        param.put("listCnt", listCnt);
        param.put("currPage", currPage);

        int cnt = bbsAtchFileMapper.selectBbsAtchFileCnt(param);
        int maxPageCnt = PaginationUtil.maxPageCnt(cnt, listCnt);
        List<Map<String, Object>> list = bbsAtchFileMapper.selectBbsAtchFileList(param);

        resultMap.put("maxPageCnt", maxPageCnt);
        resultMap.put("list", list);

        return resultMap;
    }

    @Override
    public List<BbsAtchFile> getBbsAtchFileList(Map param) throws Exception {
        param.put("skipPaging", "true");
        return bbsAtchFileMapper.selectBbsAtchFileList(param);
    }

    @Override
    public List<BbsAtchFile> getBbsAtchFileList(BoardReferenceType type, Long boardNo) throws Exception {
        Map<String, Object> param = new HashMap<>();
        param.put("refrnBbscttTy", type.getCode());
        param.put("refrnBbscttNo", boardNo);
        return getBbsAtchFileList(param);
    }

    /**
     * 저장
     */
    @Override
    @Transactional
    public int saveBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception {

        // 저장 권한 검사 등..

        if (bbsAtchFile.hasPk()) {
            // 수정
            return updateBbsAtchFile(bbsAtchFile);
        } else {
            // 신규 등록
            return insertBbsAtchFile(bbsAtchFile);
        }
    }

    /**
     * 등록
     */
    @Override
    @Transactional
    public int insertBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception {
        return bbsAtchFileMapper.insertBbsAtchFile(bbsAtchFile);
    }

    /**
     * 수정
     */
    @Override
    @Transactional
    public int updateBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception {
        return bbsAtchFileMapper.updateBbsAtchFile(bbsAtchFile);
    }

    /**
     * 동적 수정
     */
    @Override
    @Transactional
    public int updateBbsAtchFileDynamic(BbsAtchFile bbsAtchFile) throws Exception {
        return bbsAtchFileMapper.updateBbsAtchFileDynamic(bbsAtchFile);
    }

    /**
     * 삭제
     */
    @Override
    @Transactional
    public int deleteBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception {
        return bbsAtchFileMapper.deleteBbsAtchFile(bbsAtchFile);
    }

}
