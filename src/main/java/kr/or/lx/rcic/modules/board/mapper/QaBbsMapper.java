package kr.or.lx.rcic.modules.board.mapper;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.QaBbs;

import java.util.List;
import java.util.Map;

/**
 * QaBbs Mapper
 */
public interface QaBbsMapper {

    QaBbs getQaBbs(Map<String, Object> params);

    int selectQaBbsCnt(Map<String, Object> params);

    List<Map<String, Object>> selectQaBbsList(Map<String, Object> params);

    int insertQaBbs(SimpleData data);

    int updateQaBbs(QaBbs qaBbs);
    int answerQaBbs(QaBbs qaBbs);

    int deleteQaBbs(SimpleData data);
 
}
