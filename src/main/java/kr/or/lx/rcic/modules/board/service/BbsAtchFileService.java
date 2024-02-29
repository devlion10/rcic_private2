package kr.or.lx.rcic.modules.board.service;

import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;
import kr.or.lx.rcic.modules.board.entity.BoardReferenceType;
import kr.or.lx.rcic.modules.board.entity.FileAttachableBoard;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 *  게시판의 첨부파일정보를 관리한다.
 */
public interface BbsAtchFileService {

    BbsAtchFile getBbsAtchFile(Map<String, Object> params) throws Exception;

    Map<String, Object> getBbsAtchFileList(HttpServletRequest request) throws Exception;
    List<BbsAtchFile> getBbsAtchFileList(Map param) throws Exception;
    List<BbsAtchFile> getBbsAtchFileList(BoardReferenceType type, Long boardNo) throws Exception;

    int saveBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception;

    int insertBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception;

    int updateBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception;

    int updateBbsAtchFileDynamic(BbsAtchFile bbsAtchFile) throws Exception;

    int deleteBbsAtchFile(BbsAtchFile bbsAtchFile) throws Exception;

    void saveAttachFileList(FileAttachableBoard board) throws Exception;

}
