package kr.or.lx.rcic.modules.board.service;

import kr.or.lx.rcic.frmwrk.util.SimpleData;
import kr.or.lx.rcic.modules.board.entity.QaBbs;

import java.util.Map;

/**
 *  */
public interface QaBbsService {

    QaBbs getQaBbs(Map<String, Object> params) throws Exception;

    Map<String, Object> getQaBbsList(Map<String, Object> params) throws Exception;

    int insertQaBbs(SimpleData data) throws Exception;

    int updateQaBbs(QaBbs qaBbs) throws Exception;
    int answerQaBbs(QaBbs qaBbs) throws Exception;

    int deleteQaBbs(SimpleData data) throws Exception;
	
}
