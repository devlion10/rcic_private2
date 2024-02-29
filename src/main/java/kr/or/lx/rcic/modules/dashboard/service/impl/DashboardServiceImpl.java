package kr.or.lx.rcic.modules.dashboard.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.or.lx.rcic.modules.dashboard.mapper.DashboardMapper;
import kr.or.lx.rcic.modules.dashboard.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {
	@Autowired
	private DashboardMapper dashboardMapper;

	@Override
	public List<EgovMap> getGPSData(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return dashboardMapper.selectGPSInfo(params);
	}

	@Override
	public EgovMap selectTrafficInfo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return dashboardMapper.selectTrafficInfo(params);
	}

	@Override
	public int getApiUseStatusCount(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return dashboardMapper.getApiUseStatusCount(param);
	}

	@Override
	public List<Map<String, Object>> getApiUseStatsList(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return dashboardMapper.getApiUseStatsList(param);
	}

	@Override
	public List<EgovMap> getMediaType(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return dashboardMapper.selectMediaInfo(params);
	}
}
