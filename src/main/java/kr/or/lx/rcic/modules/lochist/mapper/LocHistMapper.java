package kr.or.lx.rcic.modules.lochist.mapper;

import java.util.List;
import java.util.Map;

public interface LocHistMapper {

	List<Map<String, Object>> selectLocHistList(Map<String, Object> params);
	
	int selectLocHistCnt(Map<String, Object> params);
	
}

