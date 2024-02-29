package kr.or.lx.rcic.modules.board.mapper;

import kr.or.lx.rcic.modules.board.entity.BbsAtchFile;

import java.util.List;
import java.util.Map;

/**
 * BbsAtchFile Mapper
 */
public interface BbsAtchFileMapper {

    BbsAtchFile getBbsAtchFile(Map<String, Object> params);

    int selectBbsAtchFileCnt(Map<String, Object> params);

    List<Map<String, Object>> selectBbsAtchFileList(Map<String, Object> params);

    int insertBbsAtchFile(BbsAtchFile bbsAtchFile);

    int updateBbsAtchFile(BbsAtchFile bbsAtchFile);

    int updateBbsAtchFileDynamic(BbsAtchFile bbsAtchFile);

    int deleteBbsAtchFile(BbsAtchFile bbsAtchFile);

}
