package kr.or.lx.rcic.modules.g2b.mapper;

import java.util.List;
import java.util.Map;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.Notice;

/**
 * G2b Mapper
 */
public interface G2bMapper {

    int selectG2bCnt(Map<String, Object> params);

    List<Map<String, Object>> selectG2bList(Map<String, Object> params);

	int selectAnalCnt(Map<String, Object> param);

}
