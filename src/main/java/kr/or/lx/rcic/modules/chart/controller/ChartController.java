package kr.or.lx.rcic.modules.chart.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.lx.rcic.frmwrk.util.CmmnUtil;
import kr.or.lx.rcic.modules.chart.service.ChartService; 

/**
 * @Class Name : MainController.java
 * @Description : 공통 코드 및 공용 API용 컨트롤러
 * @Modification   Information
 * @
 * @  수정일        수정자              수정내용
 * @ ---------    ---------   -------------------------------
 * @ 2018.11.11    김한욱	    	 최초생성
 * 
 *    Copyright (C) by geo All right reserved.
 */

@RestController
@RequestMapping(value="/rcic")
public class ChartController {

	@Autowired
	ChartService service;
	CmmnUtil commonUtil = new CmmnUtil();
	
	 
	/**********************************************
	 *  1. 개요 : 공사추이 차트 조회
	 *	2. 처리내용 :
	 *  3. 설명 : 진행공사수 조회
	 * 	@Method crfcMainPage
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/chart/selectChart1")
	public HashMap<String, Object> selectChart1(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart1(req);
	}	 
	
	/**********************************************
	 *  1. 개요 : 수집현황
	 *	2. 처리내용 :
	 *  3. 설명 : 수집현황 조회
	 * 	@Method crfcMainPage
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/chart/selectChart2")
	public HashMap<String, Object> selectChart2(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart2(req);
	}
	
	@SuppressWarnings("unused")
	@RequestMapping(value = "/chart/selectChart2_1")
	public HashMap<String, Object> selectChart2_1(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart2_1(req);
	}	 
	
	/**********************************************
	 *  1. 개요 : 지역별 공사수
	 *	2. 처리내용 :
	 *  3. 설명 : 공사수 조회
	 * 	@Method crfcMainPage
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/chart/selectChart3")
	public HashMap<String, Object> selectChart3(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart3(req);
	}	 
	
	/**********************************************
	 *  1. 개요 : 지역별 공사수_ 지역 클릭시 시군구 카운트 조회
	 *	2. 처리내용 :
	 *  3. 설명 : 공사수 조회
	 * 	@Method crfcMainPage
	 *  @param model
	 *  @param req
	 *  @param res
	 *  @return
	 * @throws Exception 
	 **********************************************/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/chart/selectChart3_1")
	public HashMap<String, Object> selectChart3_1(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		return service.selectChart3_1(req);
	}	 
}
