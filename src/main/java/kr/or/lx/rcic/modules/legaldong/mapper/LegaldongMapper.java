package kr.or.lx.rcic.modules.legaldong.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LegaldongMapper {

    int getLiListCnt(Map param) throws Exception;
    List<Map<String, Object>> getLiList(Map param) throws Exception;
}
