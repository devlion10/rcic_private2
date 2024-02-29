package kr.or.lx.rcic.modules.dataCntc.service.impl;

import java.awt.AWTException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.util.ParameterMap;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.params.ModifiableSolrParams;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.store.ContentFeatureCollection;
import org.geotools.data.store.ContentFeatureSource;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.joda.time.LocalDate;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.opengis.feature.Property;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;

import kr.go.ads.client.ADSReceiver;
import kr.go.ads.client.ADSUtils;
import kr.go.ads.client.ReceiveData;
import kr.go.ads.client.ReceiveDatas;
import kr.or.lx.rcic.modules.dataCntc.mapper.DataCntcMapper;
import kr.or.lx.rcic.modules.dataCntc.service.DataCntcService;
import kr.or.lx.rcic.modules.dataCntc.updateClient.UpdateClient;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DataCntcServiceImpl implements DataCntcService {

	@Value("#{contextProperties}")
	Properties prop = new Properties();

	@Autowired
	private DataCntcMapper dataCntcMapper;

	@Resource(name = "updateClient")
	UpdateClient updateClient;

	@Autowired
	private ServletContext servletContext;

	/**
	 * 변동분 요청 및 다운로드 후 변경분 데이터 적재
	 */
	@Override
	@Transactional
	public Map<String, Object> roadNameDataCntc() {
		ArrayList<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		Map<String, Object> fileMap = new HashMap<String, Object>();
		Map<String, Object> paraMap = new HashMap<String, Object>();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		String str;
		int dataCnt = 0;
		LocalDate now = LocalDate.now();
		String req_date = now.toString();
		req_date = req_date.replaceAll("-", "");
		String filePath_ = "";
		String fileName_ = "";
		paraMap.put("result", "fail");

		ADSReceiver ads = new ADSReceiver(); // ADSReceiver 객체 생성
		String app_key = prop.getProperty("appKey"); // 승인키 (신청시 발급된 승인키)
		String date_gb = "D"; // 날짜 구분 (M: 월변동)
		String retry_in = "Y"; // 재반영 요청 여부
		String cntc_cd = "200002"; // 자료 요청 구분
		String req_date_from = req_date; // 요청일자(From)
		String req_date_to = ""; // 요청일자(To)
		String filePath = prop.getProperty("filePath");

		File folder = new File(filePath);
		if (!folder.exists()) {
			try {
				folder.mkdirs();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// 변동 자료를 저장할 파일경로를 설정합니다.
		ads.setFilePath(filePath);
		ads.setCreateDateDirectory(ADSUtils.YYMMDD);
		

		try {
			// 변동자료 연계서비스 요청 및 응답데이터 확인
			ReceiveDatas receiveDatas = ads.receiveAddr(app_key, date_gb, cntc_cd, retry_in, req_date_from,
					req_date_to);

			/*
			 * --------------------------------- 응답 결과 확인 ---------------------------------
			 */
			if (receiveDatas.getResult() != 0) {
				if (receiveDatas.getResult() == -1) {
					// 서버 접속 실패 : 잠시후 재 시도 하시기 바랍니다.
					System.out.println("서버 접속 실패");
				}
				// 서버 페이지 오류 사항 확인
				System.out.println("Result code : " + receiveDatas.getResult());
				System.out.println("Response code : " + receiveDatas.getResCode());
				System.out.println("Response Msg : " + receiveDatas.getResMsg());
				return paraMap;
			}

			// 서버 응답 확인
			System.out.println("Response code : " + receiveDatas.getResCode()); // 응답코드
			System.out.println("Response Msg : " + receiveDatas.getResMsg()); // 응답메시지

			if (!"P0000".equals(receiveDatas.getResCode())) {
				return paraMap;
			}
			/*
			 * --------------------------------- 응답 결과 완료 ---------------------------------
			 */

			// 결과 데이터 정렬
			ArrayList result = receiveDatas.getReceiveDatas(ADSUtils.UPDATE_ASC);
			Iterator itr = result.iterator();
			while (itr.hasNext()) {
				// 결과 데이터 건별 정보 확인
				ReceiveData receiveData = (ReceiveData) itr.next();
				System.out.print(" CNTC : ");
				System.out.print(receiveData.getCntcCode());
				System.out.print(" RES_CODE : ");
				System.out.println(receiveData.getResCode());

				if (!"P0000".equals(receiveData.getResCode())) {
					// 해당 파일응답 에러. 특히 E1001 인경우, 해당 파일을 아직 생성하지 못한 응답으로 추후 재시도 필요.
					System.out.println("해당파일에 대한 응답이 정상이 아니기에 재 요청 필요");
				} else {
					String folderName = req_date.substring(2, 8);
					String fileName = receiveData.getFileName();
					//String fileFullPAth = filePath + "\\" + folderName + "\\"; // window
					String fileFullPAth = filePath + "/" + folderName + "/"; // linux
					// 연계가 끝난 zip 파일 해제
					fileList = unZip(fileFullPAth, fileName);
				}
			}

			for (Map<String, Object> map : fileList) {
				if (map.get("fileName").toString().contains("TH_SPRD_INTRVL_POSITION")) {
					filePath_ = map.get("filePath").toString();
					fileName_ = map.get("fileName").toString();
				}
			}

			// 변동분에 전체 데이터 적재
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(new FileInputStream(filePath_ + fileName_), "euc-kr"));

			if (fileName_.contains("TH_SPRD_INTRVL_POSITION")) {
				while ((str = reader.readLine()) != null) {
					if (str.equals("No Data")) {
						System.out.println(fileName_ + " 파일에 변동자료가 없습니다.");
						break;
					}
					String[] cntcCd = str.split("\\|");
					if (cntcCd[0].length() > 0) {
						dataMap.put("sig_cd", cntcCd[0]);
					} // 시군구 코드
					if (cntcCd[1].length() > 0) {
						dataMap.put("bsi_int_sn", cntcCd[1]);
					} // 기초구간 일련번호
					if (cntcCd[2].length() > 0) {
						dataMap.put("bsi_mn", cntcCd[2]);
					} // 기초번호본번
					if (cntcCd[3].length() > 0) {
						dataMap.put("bsi_sl", cntcCd[3]);
					} // 기초번호부번
					if (cntcCd[4].length() > 0) {
						dataMap.put("rds_man_no", cntcCd[4]);
					} // 도로구간일련번호
					if (cntcCd[5].length() > 0) {
						dataMap.put("ctp_nm", cntcCd[5]);
					} // 시도 명
					if (cntcCd[6].length() > 0) {
						dataMap.put("sig_nm", cntcCd[6]);
					} // 시군구 명
					if (cntcCd[7].length() > 0) {
						dataMap.put("emd_cd", cntcCd[7]);
					} // 읍면동 코드
					if (cntcCd[8].length() > 0) {
						dataMap.put("emd_nm", cntcCd[8]);
					} // 읍면동 명
					if (cntcCd[9].length() > 0) {
						dataMap.put("rn_cd", cntcCd[9]);
					} // 도로명코드
					if (cntcCd[10].length() > 0) {
						dataMap.put("rn", cntcCd[10]);
					} // 도로명
					if (cntcCd[11].length() > 0) {
						dataMap.put("rbp_cn", cntcCd[11]);
					} // 도로구간시점
					if (cntcCd[12].length() > 0) {
						dataMap.put("rep_cn", cntcCd[12]);
					} // 도로구간종점
					if (cntcCd[13].length() > 0) {
						dataMap.put("center_x", cntcCd[13]);
					} // 중심점좌표_X
					if (cntcCd[14].length() > 0) {
						dataMap.put("center_y", cntcCd[14]);
					} // 중심점좌표_Y
					if (cntcCd[15].length() > 0) {
						dataMap.put("mvm_res_cd", cntcCd[15]);
					} // 이동사유코드
					if (cntcCd[16].length() > 0) {
						dataMap.put("chg_dt", cntcCd[16]);
					} // 변경일시

					if (dataCnt < 1) {
						paraMap.put("chg_dt", cntcCd[16]);
						// 해당 날짜 변동분이 이미 DB에 존재하면 중단
						int cnt = dataCntcMapper.selectRoadNameChangeCnt(cntcCd[16]);
						if (cnt > 0)
							break;
					}
					dataCntcMapper.insertRoadNameChange(dataMap);
					dataCnt++;
				}
				reader.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return paraMap;
		}
		paraMap.put("result", "success");
		return paraMap;
	}

	/**
	 * 변동분 요청 및 자료 다운로드(shp)
	 */
	@Override
	@Transactional
	public Map<String, Object> roadNameDataCntcShp() {
		ArrayList<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		Map<String, Object> fileMap = new HashMap<String, Object>();
		Map<String, Object> paraMap = new HashMap<String, Object>();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String str;
		int dataCnt = 0;
		LocalDate now = LocalDate.now();
		String req_date = now.toString();
		req_date = req_date.replaceAll("-", "");
		paraMap.put("result", "fail");

		ADSReceiver ads = new ADSReceiver(); // ADSReceiver 객체 생성
		String app_key = prop.getProperty("appKey"); // 승인키 (신청시 발급된 승인키)
		String date_gb = "D"; // 날짜 구분 (M: 월변동)
		String retry_in = "Y"; // 재반영 요청 여부
		String cntc_cd = "300003"; // 자료 요청 구분
		String req_date_from = req_date; // 요청일자(From)
		String req_date_to = ""; // 요청일자(To)
		String filePath = prop.getProperty("filePath");

		File folder = new File(filePath);
		if (!folder.exists()) {
			try {
				folder.mkdirs();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// 변동 자료를 저장할 파일경로를 설정합니다.
		ads.setFilePath(filePath);
		ads.setCreateDateDirectory(ADSUtils.YYMMDD);

		try {
			// 변동자료 연계서비스 요청 및 응답데이터 확인
			ReceiveDatas receiveDatas = ads.receiveAddr(app_key, date_gb, cntc_cd, retry_in, req_date_from,
					req_date_to);

			/*
			 * --------------------------------- 응답 결과 확인 ---------------------------------
			 */
			if (receiveDatas.getResult() != 0) {
				if (receiveDatas.getResult() == -1) {
					// 서버 접속 실패 : 잠시후 재 시도 하시기 바랍니다.
					System.out.println("서버 접속 실패");
				}
				// 서버 페이지 오류 사항 확인
				System.out.println("Result code : " + receiveDatas.getResult());
				System.out.println("Response code : " + receiveDatas.getResCode());
				System.out.println("Response Msg : " + receiveDatas.getResMsg());
				return paraMap;
			}

			// 서버 응답 확인
			System.out.println("Response code : " + receiveDatas.getResCode()); // 응답코드
			System.out.println("Response Msg : " + receiveDatas.getResMsg()); // 응답메시지

			if (!"P0000".equals(receiveDatas.getResCode())) {
				return paraMap;
			}
			/*
			 * --------------------------------- 응답 결과 완료 ---------------------------------
			 */

			// 결과 데이터 정렬
			ArrayList result = receiveDatas.getReceiveDatas(ADSUtils.UPDATE_ASC);
			Iterator itr = result.iterator();
			while (itr.hasNext()) {
				// 결과 데이터 건별 정보 확인
				ReceiveData receiveData = (ReceiveData) itr.next();
				System.out.print(" CNTC : ");
				System.out.print(receiveData.getCntcCode());
				System.out.print(" RES_CODE : ");
				System.out.println(receiveData.getResCode());

				if (!"P0000".equals(receiveData.getResCode())) {
					// 해당 파일응답 에러. 특히 E1001 인경우, 해당 파일을 아직 생성하지 못한 응답으로 추후 재시도 필요.
					System.out.println("해당파일에 대한 응답이 정상이 아니기에 재 요청 필요");
				} else {
					String folderName = req_date.substring(2, 8);
					String fileName = receiveData.getFileName();
					// String fileFullPAth = filePath + "\\" + folderName + "\\"; // window
					String fileFullPAth = filePath + "/" + folderName + "/"; // linux
					// 연계가 끝난 zip 파일 해제
					fileList = unZip(fileFullPAth, fileName);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return paraMap;
		}

		try {
			// 변동분 자료 데이터 DB에 적재
			resultMap = insertRoadNameShpData(fileList);
		} catch (Exception e) {
			e.printStackTrace();
		}

		paraMap.put("result", "success");
		paraMap.put("opert_de", resultMap.get("opert_de").toString());

		return paraMap;
	}

	/**
	 * 다운로드 된 변동분 zip압축 해제
	 */
	public static ArrayList<Map<String, Object>> unZip(String filePath, String FileName) throws Exception {
		ArrayList<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		Map<String, Object> fileMap = null;
		try {
			String filFullepath = filePath + FileName;
			FileInputStream fin = new FileInputStream(filFullepath);
			ZipInputStream zin = new ZipInputStream(fin);
			ZipEntry entry = null;
			try {
				while ((entry = zin.getNextEntry()) != null) {
					String fileName = entry.getName();
					System.out.println(entry.getName() + "에  압축(.zip)을 해제합니다.");
					OutputStream zout = new FileOutputStream(filePath + entry.getName());
					byte[] buf = new byte[1024];
					int len;
					while ((len = zin.read(buf)) > 0) {
						zout.write(buf, 0, len);
					}
					zin.closeEntry();
					zout.close();
					fileMap = new HashMap<String, Object>();
					fileMap.put("filePath", filePath);
					fileMap.put("fileName", fileName);
					fileList.add(fileMap);
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					zin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

		return fileList;
	}

	@Override
	@Transactional
	public String insertRoadNameChange(Map<String, Object> fileMap) throws Exception {
		dataCntcMapper.insertRoadNameChange(fileMap);
		return null;
	}

	/**
	 * 전체분 자료 일괄 적재(기초번호_txt)
	 */
	@Override
	@Transactional
	public void insertRoadNameAll(Map<String, Object> fileMap) throws Exception {
		String str;
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		Map<String, Object> paraMap = null;
		fileInfo = fileMap;
		String filePath = fileInfo.get("filePath").toString();
		File dir = new File(filePath);
		File fileName[] = dir.listFiles();

		for (int i = 0; i < fileName.length; i++) {
			try {
				System.out.println("test:" + fileName[i].toString());
				if (!fileName[i].isDirectory()) {
					BufferedReader reader = new BufferedReader(
							new InputStreamReader(new FileInputStream(fileName[i].toString()), "euc-kr"));

					if (fileName[i].toString().contains("intrvl")) {
						paraMap = new ParameterMap<String, Object>();

						while ((str = reader.readLine()) != null) {
							String[] cntcCd = str.split("\\|");
							if (cntcCd[0].length() > 0) {
								paraMap.put("sig_cd", cntcCd[0]);
							} // 시군구 코드
							if (cntcCd[1].length() > 0) {
								paraMap.put("bsi_int_sn", cntcCd[1]);
							} // 기초구간 일련번호
							if (cntcCd[2].length() > 0) {
								paraMap.put("bsi_mn", cntcCd[2]);
							} // 기초번호본번
							if (cntcCd[3].length() > 0) {
								paraMap.put("bsi_sl", cntcCd[3]);
							} // 기초번호부번
							if (cntcCd[4].length() > 0) {
								paraMap.put("rds_man_no", cntcCd[4]);
							} // 도로구간일련번호
							if (cntcCd[5].length() > 0) {
								paraMap.put("ctp_nm", cntcCd[5]);
							} // 시도 명
							if (cntcCd[6].length() > 0) {
								paraMap.put("sig_nm", cntcCd[6]);
							} // 시군구 명
							if (cntcCd[7].length() > 0) {
								paraMap.put("emd_cd", cntcCd[7]);
							} // 읍면동 코드
							if (cntcCd[8].length() > 0) {
								paraMap.put("emd_nm", cntcCd[8]);
							} // 읍면동 명
							if (cntcCd[9].length() > 0) {
								paraMap.put("rn_cd", cntcCd[9]);
							} // 도로명코드
							if (cntcCd[10].length() > 0) {
								paraMap.put("rn", cntcCd[10]);
							} // 도로명
							if (cntcCd[11].length() > 0) {
								paraMap.put("rbp_cn", cntcCd[11]);
							} // 도로구간시점
							if (cntcCd[12].length() > 0) {
								paraMap.put("rep_cn", cntcCd[12]);
							} // 도로구간종점
							if (cntcCd[13].length() > 0) {
								paraMap.put("center_x", cntcCd[13]);
							} // 중심점좌표_X
							if (cntcCd[14].length() > 0) {
								paraMap.put("center_y", cntcCd[14]);
							} // 중심점좌표_Y

							dataCntcMapper.insertRoadNameAll(paraMap);
						}
						reader.close();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 전체분 자료 일괄 적재(도로명이 부여된 도로 도형_shp)
	 */
	@Override
	@Transactional
	public void insertRoadNameShpAll(Map<String, Object> fileMap) throws Exception {
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		fileInfo = fileMap;
		String filePath = fileInfo.get("filePath").toString();
		File dir = new File(filePath);
		File fileNames[] = dir.listFiles();

		try {
			// 해당 경로의 전체 파일을 돌면서
			for (int i = 0; i < fileNames.length; i++) {
				// 도로도형 전체분의 시도별 폴더 마다
				if (fileNames[i].isDirectory() && fileNames[i].toString().contains("000")) {
					File files[] = fileNames[i].listFiles();
					// 폴더 하위에 있는 파일 목록 중에
					for (File file : files) {
						// insert 대상(.shp)
						if (file.toString().contains("TL_SPRD_MANAGE") && file.toString().contains(".shp")) {
							// 서버에서 읽기
							File f = new File(file.toString());
							ShapefileDataStore dataStore = new ShapefileDataStore(f.toURL());
							dataStore.setCharset(Charset.forName("euc-kr"));
							SimpleFeatureTypeBuilder featureTypeBuilder = new SimpleFeatureTypeBuilder();
							ContentFeatureSource featureSource = dataStore.getFeatureSource();
							ContentFeatureCollection featureCollection = featureSource.getFeatures();
							featureTypeBuilder.init(featureCollection.getSchema());
							SimpleFeatureIterator iterator = featureCollection.features();
							List<Map<String, Object>> arrayList = new ArrayList<>();
							long cnt = 0;
							while (iterator.hasNext()) {
								// 100개 단위로 커밋
								if ((cnt % 100 == 0) && cnt > 0) {
									dataCntcMapper.insertRoadNameAllShpData(arrayList);
									arrayList.clear();
								}

								SimpleFeature feature = iterator.next();
								Map<String, Object> map = new LinkedHashMap<>();
								List<Object> attributes = feature.getAttributes(); // values
								Iterator propertyIterator = feature.getProperties().iterator();

								int propIdx = 0;
								while (propertyIterator.hasNext()) {
									Property prop = (Property) propertyIterator.next();
									String name = prop.getName().toString();
									map.put(name, attributes.get(propIdx));
									propIdx++;
								}

								// 샘플 파일에 geom 이름이 없어서 임의로 the_geom을 넣음
								if (map.get("the_geom") != null && map.get("geom") == null) {
									map.put("geom", map.get("the_geom"));
								}
								arrayList.add(map);
								cnt++;
							}
							dataStore.dispose();

						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리 (기초번호_txt)
	 */
	@Override
	@Transactional
	public void roadNameChangeDo(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> paraMap = paramMap;
		List<Map<String, Object>> dataList = null;

		String chgDt = paraMap.get("chg_dt").toString();

		// 1.변동분 생성분(변경사유:C)데이터를 전체분에 반영
		int cnt = dataCntcMapper.selectRoadNameAllChangeCnt(chgDt);
		if (cnt < 1) { // 적용된 날짜가 없으면
			// 생성분 적재 진행
			dataCntcMapper.insertRoadNameAllChange(paraMap);
		}

		// 2.변동분 변경분(변경사유:U)데이터를 전체분에 반영
		paraMap.put("mvm_res_cd", "U");
		dataList = new ArrayList<Map<String, Object>>();
		dataList = dataCntcMapper.selectRoadNameChangeList(paraMap);
		// delete & insert 방식으로 업데이트 처리.
		for (Map<String, Object> map : dataList) {
			dataCntcMapper.deleteRoadNameAllChange(map);
		}
		dataCntcMapper.updateRoadNameAllChange(paraMap);

		// 3.변동분 삭제분(변경사유:D)데이터를 전체분에 반영
		paraMap.put("mvm_res_cd", "D");
		dataList = new ArrayList<Map<String, Object>>();
		dataList = dataCntcMapper.selectRoadNameChangeList(paraMap);
		for (Map<String, Object> map : dataList) {
			dataCntcMapper.deleteRoadNameAllChange(map);
		}

	}

	/**
	 * 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리 (도로명이 부여된 도로 도형_shp)
	 */
	@Override
	@Transactional
	public void roadNameDataCntcShpDo(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> paraMap = paramMap;
		List<Map<String, Object>> dataList = null;

		// 1.해당 날짜의 변동분 생성분(변경사유:C)데이터가 전체분에 존재하면 지우고 전체분에 다시 insert
		paraMap.put("div_cd", "C");
		dataList = new ArrayList<Map<String, Object>>();
		dataList = dataCntcMapper.selectRoadNameChangeShpCList(paraMap);
		// delete &insert 방식으로 업데이트 처리.
		for (Map<String, Object> map : dataList) {
			dataCntcMapper.deleteRoadNameAllShpChange(map);
		}
		dataCntcMapper.updateRoadNameAllShpChange(paraMap);

		// 2.변동분 삭제분(변경사유:D)데이터를 전체분에 반영
		paraMap.put("div_cd", "D");
		dataList = new ArrayList<Map<String, Object>>();
		dataList = dataCntcMapper.selectRoadNameChangeShpList(paraMap);
		for (Map<String, Object> map : dataList) {
			dataCntcMapper.deleteRoadNameAllShpChange(map);
		}
	}

	@Override
	@Transactional
	public int deleteRoadName() throws Exception {
		return dataCntcMapper.deleteRoadName();
	}

	@Override
	@Transactional
	public int insertRoadName() throws Exception {
		return dataCntcMapper.insertRoadName();
	}

	@Override
	public List<Map<String, Object>> selectRoadNameChangeList(Map<String, Object> paramMap) throws Exception {
		return dataCntcMapper.selectRoadNameChangeList(paramMap);
	}

	@Override
	public int insertRoadNameAllChange(Map<String, Object> paraMap) throws Exception {
		return dataCntcMapper.insertRoadNameAllChange(paraMap);
	}

	@Override
	public int updateRoadNameAllChange(Map<String, Object> paraMap) throws Exception {
		return dataCntcMapper.updateRoadNameAllChange(paraMap);
	}

	@Override
	public int deleteRoadNameAllChange(Map<String, Object> paraMap) throws Exception {
		return dataCntcMapper.deleteRoadNameAllChange(paraMap);
	}

	@Override
	public int selectRoadNameChangeCnt(String chg_dt) throws Exception {
		return dataCntcMapper.selectRoadNameChangeCnt(chg_dt);
	}

	@Override
	public int selectRoadNameAllChangeCnt(String chg_dt) throws Exception {
		return dataCntcMapper.selectRoadNameAllChangeCnt(chg_dt);
	}

	/**
	 * Data Import 실행 (full-import)
	 */
	@Override
	public String dataImportDo(String solrServerUrl, String sdate, String edate, String minute)
			throws SolrServerException, AWTException, IOException, InterruptedException {
		SolrClient solr = null;

		try {
			// Data Import
			solr = new HttpSolrClient.Builder(solrServerUrl).build();
			ModifiableSolrParams params = new ModifiableSolrParams();
			params.set("command", "full-import");
			params.set("qt", "/dataimport");
			params.set("clean", "true");
			params.set("commit", "true");
			params.set("sdate", sdate.substring(0, 8));
			params.set("edate", edate.substring(0, 8));
			solr.query(params);

			if(minute=="") {
				// 10분 기다림
				int delayTime = 10 * 60 * 1000;
				Thread.sleep(delayTime);
			}else {
				// 10분 기다림
				int delayTime = Integer.parseInt(minute) * 60 * 1000;
				Thread.sleep(delayTime);
			}

		} catch (Exception e) {
			e.printStackTrace();
			solr.close();
			System.out.println("solr-data-import:fail");
			return "failure";
		} finally {
			if (solr != null) {
				solr.close();
			}
		}
		System.out.println("solr-data-import:complete");
		return "success";
	}

	// 솔라 검색엔진 특정 코어 갱신
	@Override
	public void coreReloadDo(String solrAdminUrl, String target) throws Exception {
		SolrClient solr = null;
		try {
			// Reload
			solr = new HttpSolrClient.Builder(solrAdminUrl).build();
			ModifiableSolrParams params = new ModifiableSolrParams();
			params = new ModifiableSolrParams();
			params.set("action", "RELOAD");
			params.set("qt", "/cores");
			params.set("core", target);
			solr.query(params);

		} catch (Exception e) {
			e.printStackTrace();
			solr.close();
		} finally {
			if (solr != null) {
				solr.close();
			}
		}
	}

	/**
	 * 다운로드 된 변동분 자료(shp파일)데이터를 적재
	 */
	@Override
	public Map<String, Object> insertRoadNameShpData(ArrayList<Map<String, Object>> paraFileList) throws Exception {
		ArrayList<Map<String, Object>> fileList = paraFileList;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> paraMap = null;
		String filePath = "";
		String fileName = "";
		String shpFileFullPath = "";
		String delfilePath = "";
		String delfileName = "";
		String delShpFileFullPath = "";
		String str;

		// insert, update 대상
		for (Map<String, Object> map : fileList) {
			if (map.get("fileName").toString().contains("TI_SPRD_MANAGE")
					&& map.get("fileName").toString().contains(".shp")) {
				filePath = map.get("filePath").toString();
				fileName = map.get("fileName").toString();
			}
		}

		// delete 대상
		for (Map<String, Object> map : fileList) {
			if (map.get("fileName").toString().contains("TI_SPRD_MANAGE")
					&& map.get("fileName").toString().contains(".Deletion")) {
				delfilePath = map.get("filePath").toString();
				delfileName = map.get("fileName").toString();
			}
		}

		shpFileFullPath = filePath + fileName;
		delShpFileFullPath = delfilePath + delfileName;

		// 서버에서 읽기
		File file = new File(shpFileFullPath);
		ShapefileDataStore dataStore = new ShapefileDataStore(file.toURL());
		dataStore.setCharset(Charset.forName("euc-kr"));
		SimpleFeatureTypeBuilder featureTypeBuilder = new SimpleFeatureTypeBuilder();
		ContentFeatureSource featureSource = dataStore.getFeatureSource();
		ContentFeatureCollection featureCollection = featureSource.getFeatures();
		featureTypeBuilder.init(featureCollection.getSchema());
		SimpleFeatureIterator iterator = featureCollection.features();
		List<Map<String, Object>> arrayList = new ArrayList<>();

		while (iterator.hasNext()) {
			SimpleFeature feature = iterator.next();
			Map<String, Object> map = new LinkedHashMap<>();
			List<Object> attributes = feature.getAttributes(); // values
			Iterator propertyIterator = feature.getProperties().iterator();

			int propIdx = 0;
			while (propertyIterator.hasNext()) {
				Property prop = (Property) propertyIterator.next();
				String name = prop.getName().toString();
				map.put(name, attributes.get(propIdx));
				propIdx++;
			}

			// 샘플 파일에 geom 이름이 없어서 임의로 the_geom을 넣음
			if (map.get("the_geom") != null && map.get("geom") == null) {
				map.put("geom", map.get("the_geom"));
			}

			map.put("DIV_CD", "C");
			arrayList.add(map);
		}

		// 변동분의 insert, update시킬 데이터가 존재한다면
		if (arrayList.size() > 0) {
			resultMap.put("opert_de", arrayList.get(0).get("OPERT_DE").toString());
			int cnt = dataCntcMapper.selectRoadNameChangeShpDataCnt(resultMap.get("opert_de").toString());
			if (cnt < 1) {
				dataCntcMapper.insertRoadNameChangeShpData(arrayList);
			}
		}

		try {
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(new FileInputStream(delShpFileFullPath), "euc-kr"));

			if (delfileName.contains("TI_SPRD_MANAGE.Deletion")) {
				while ((str = reader.readLine()) != null) {
					String[] cntcCd = str.split("\\|");
					paraMap = new HashMap<String, Object>();
					if (!cntcCd[0].toString().equals("RDS_MAN_NO") && !cntcCd[0].toString().equals("No Data")) {
						if (cntcCd[0].length() > 0) {
							paraMap.put("RDS_MAN_NO", cntcCd[0]);
						} // RDS_MAN_NO
						if (cntcCd[1].length() > 0) {
							paraMap.put("SIG_CD", cntcCd[1]);
						} // SIG_CD
						paraMap.put("DIV_CD", "D");
						// 중복 검사
						int cnt = dataCntcMapper.selectRoadNameChangeShpDeleteDataCnt(paraMap);
						if (1 > cnt) {
							dataCntcMapper.insertRoadNameChangeShpDeleteData(paraMap);
						}
					}
				}
				reader.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dataStore.dispose();
		}

		return resultMap;
	}

	/**
	 * 전체분 자료 전체 삭제(기초번호_txt)
	 */
	@Override
	public void deleteRoadNameAll() throws Exception {
		dataCntcMapper.deleteRoadNameAll();
	}

	/**
	 * 전체분 자료 전체 삭제(도로명이 부여된 도로 도형_shp)
	 */
	@Override
	public void deleteRoadNameShpAll() throws Exception {
		dataCntcMapper.deleteRoadNameShpAll();
	}

	/**
	 * 전체분 전체 자료 최초 1회 데이터 일괄 적재(기초번호_txt,도로명이 부여된 도로 도형_shp)
	 */
	@Override
	@Transactional
	public void insertRoadNameAllDo(Map<String, Object> paraFileMap) throws Exception {
		Map<String, Object> fileMap = new HashMap<String, Object>();
		fileMap = paraFileMap;
		// (기초번호_txt)
		dataCntcMapper.deleteRoadNameAll();
		this.insertRoadNameAll(fileMap);
		// (도로명이 부여된 도로 도형_shp)
		dataCntcMapper.deleteRoadNameShpAll();
		this.insertRoadNameShpAll(fileMap);
	}

	/**
	 * 전체분 데이터을 기존 새주소도로명으로 최초 1회 마이그레이션 처리(기초번호_txt + 도로명이 부여된 도로 도형_shp)
	 */
	@Override
	@Transactional
	public void roadNameDataCntcAllMigDo() throws Exception {
		// 데이터 전체 삭제
		dataCntcMapper.deleteRoadName();
		// 데이터 전체 삽입(기초번호_txt + 도로명이 부여된 도로 도형_shp)
		dataCntcMapper.insertRoadName();
	}

	/**
	 * 변동분 자료 다운로드 후 변동분 데이터 적재 & 일 변동 자료의 변동사유(생성,변동,폐지)에 따른 처리
	 */
	@Override
	@Transactional
	public void roadNameDataCntcChangeDo() throws Exception {
		Map<String, Object> paraMap = new HashMap<String, Object>();
		Map<String, Object> paraShpMap = new HashMap<String, Object>();

		// 1.변동분 자료 다운로드 및 변동분 자료 적재(기초번호_txt)
		paraMap = this.roadNameDataCntc();
		// 2.변동사유(생성,변동,폐지)에 따른 처리 및 반영(기초번호_txt)
		this.roadNameChangeDo(paraMap);
		// 3.변동분 자료 다운로드 및 변동분 자료 적재(도로명이 부여된 도로 도형_shp)
		paraShpMap = roadNameDataCntcShp();
		// 4.변동사유(생성,변동,폐지)에 따른 처리 및 반영(도로명이 부여된 도로 도형_shp)
		this.roadNameDataCntcShpDo(paraShpMap);
		// 5.변동된 전체분을 다시 기존 새주소도로명에 새로 반영
		dataCntcMapper.deleteRoadName();
		dataCntcMapper.insertRoadName();
	}

	@Override
	public void insertCbndData(ArrayList<Map<String, Object>> paraList) throws Exception {
		dataCntcMapper.insertCbndData(paraList);
	}

	@Override
	public List<Map<String, Object>> getRoadNameEmdCdList() throws Exception {
		return dataCntcMapper.getRoadNameEmdCdList();
	}

	@Override
	public void deleteCbndInfo() throws Exception {
		dataCntcMapper.deleteCbndInfo();
	}

	@Override
	@Transactional
	public void cbndAPIDo() throws Exception {
		String targerURL = prop.getProperty("vworld.requestURL"); // 요청 URL주소
    	String key = prop.getProperty("vworld.authKey"); // API KEY값
    	String domain = prop.getProperty("vworld.domainURL"); // 신청한 도메인 URL주소
    	String service = prop.getProperty("vworld.service"); // 요청 서비스명
    	String request = prop.getProperty("vworld.request"); // 요청 서비스 오퍼레이션
    	String data = prop.getProperty("vworld.data"); // 조회할 데이터
    	String attrFilter = "emdCd:=:"; // 속성조회를 위한 조건검색을 정의
    	String size = "1000"; // 한 페이지에 출력될 응답결과 건수. min(1), max(1000)
    	int page = 1; // 검색 페이지 번호
    	int current = 1; // 현재 페이지 번호
    	int total = 0; // 전체 페이지 수
    	int count = 1;
    	ArrayList<Map<String, Object>> dataList = null;
    	JSONParser parser = null;
        JSONObject json = null;
        String status = "";
        JSONObject pageJson = null;
        JSONArray features = null;
    	StringBuffer sbUrl = null;
    	StringBuffer response = null;
    	URL url = null;
    	HttpURLConnection conn = null;
    	BufferedReader in = null;
    	Map<String, Object> dataMap = null;
    	
    	// 1. 연속지적도 테이블 데이터 모두 제거
    	this.deleteCbndInfo();
    	// 2. 새주소 도로명에서 읍면동 코드 전체 리스트 조회
    	List<Map<String, Object>> emdCdList = this.getRoadNameEmdCdList();
    	
    	// 전체 읍면동 코드 갯수 만큼
    	for (Map<String, Object> map : emdCdList) {
    		// 요청 url 및 파라미터 
    		sbUrl = new StringBuffer();
        	sbUrl.append(targerURL);
        	sbUrl.append("?service=").append(service);
        	sbUrl.append("&request=").append(request);
        	sbUrl.append("&data=").append(data);
        	sbUrl.append("&key=").append(key);
        	sbUrl.append("&domain=").append(domain);
    		sbUrl.append("&size=").append(size);
    		sbUrl.append("&attrFilter=").append(attrFilter + map.get("emdCd").toString());
    		sbUrl.append("&page=").append(page);
    		
	    	// API호출
	    	try {
	    		url = new URL(sbUrl.toString());
	    		conn = (HttpURLConnection)url.openConnection();
	    		conn.setRequestMethod("GET"); 
	    		
	    		// 커넥션 성공시
	    		if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
	    			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	    			response = new StringBuffer();
	    			String inputLine; 
	    			if(in != null){
	    				while ((inputLine = in.readLine()) != null) {
	    					// 응답 결과 데이터 저장
	    					response.append(inputLine); 
	    				} 
	    			}
	    		}
	    	}catch (Exception e) {
	    		e.printStackTrace();
	    	}finally{
	    		if(conn!=null) {
					conn.disconnect();
				}
	    		if(in!=null) {
					try {
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
	    	}
	    	
	    	parser = new JSONParser();
	    	json = (JSONObject) parser.parse(response.toString());
	    	json = (JSONObject) json.get("response");
	    	status = json.get("status").toString();
	    	
	    	
	    	if(status.equals("OK")) {
	    		pageJson = (JSONObject) json.get("page"); 
	    		total = Integer.parseInt(pageJson.get("total").toString()); // 전체 페이지수 
	    	}
	    	
    		// 읍면동코드의 전체 페이지 수만큼 조회
    		for (int i=1; i<total+1; i++) {
    			// 요청 url 및 파라미터 
        		sbUrl = new StringBuffer();
            	sbUrl.append(targerURL);
            	sbUrl.append("?service=").append(service);
            	sbUrl.append("&request=").append(request);
            	sbUrl.append("&data=").append(data);
            	sbUrl.append("&key=").append(key);
            	sbUrl.append("&domain=").append(domain);
        		sbUrl.append("&size=").append(size);
        		sbUrl.append("&attrFilter=").append(attrFilter + map.get("emdCd").toString());
        		sbUrl.append("&page=").append(i);
        		
    	    	// API호출
    	    	try {
    	    		url = new URL(sbUrl.toString());
    	    		conn = (HttpURLConnection)url.openConnection();
    	    		conn.setRequestMethod("GET"); 
    	    		
    	    		// 커넥션 성공시
    	    		if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
    	    			System.out.println("url:"+url);
    	    			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    	    			response = new StringBuffer();
    	    			String inputLine; 
    	    			if(in != null){
    	    				while ((inputLine = in.readLine()) != null) {
    	    					// 응답 결과 데이터 저장
    	    					response.append(inputLine); 
    	    				} 
    	    			}
    	    		}
    	    	}catch (Exception e) {
    	    		e.printStackTrace();
    	    	}finally{
    	    		if(conn!=null) {
    					conn.disconnect();
    				}
    	    		if(in!=null) {
    					try {
    						in.close();
    					} catch (Exception e) {
    						e.printStackTrace();
    					}
    				}
    	    	}
    	    	
    	    	parser = new JSONParser();
    	    	json = (JSONObject) parser.parse(response.toString());
    	    	json = (JSONObject) json.get("response");
    	    	status = json.get("status").toString();
    	    	//pageJson = (JSONObject) json.get("page"); 
    	    	//total = Integer.parseInt(pageJson.get("total").toString()); // 전체 페이지수
    	    	//current = Integer.parseInt(pageJson.get("current").toString()); // 현재 페이지

    	    	// 데이터 추출  
    	    	if(status.equals("OK")) {
    	    		json = (JSONObject) json.get("result");
    	    		json = (JSONObject) json.get("featureCollection");
    	    		features = (JSONArray) json.get("features"); // 형상데이터
    	
    	    		for(int j=0; j<features.size(); j++){ 
    	    			JSONObject tmpJson = (JSONObject) features.get(j);
    	    			JSONObject geomJson = (JSONObject) tmpJson.get("geometry"); // 지오메트리
    	    			JSONObject propJson = (JSONObject) tmpJson.get("properties"); // 속성값
    	    			String pnu = propJson.get("pnu").toString();
    	    			String jibun = propJson.get("jibun").toString();
    	    			String bonbun = propJson.get("bonbun").toString();
    	    			String bubun = propJson.get("bubun").toString();
    	    			String addr = propJson.get("addr").toString();
    	    			String gosi_year = propJson.get("gosi_year").toString();
    	    			String gosi_month = propJson.get("gosi_month").toString();
    	    			String jiga = propJson.get("jiga").toString();
    	
    	    			dataMap = new HashMap<String, Object>();
    	    			dataMap.put("pnu", pnu); // pnu
    	    			dataMap.put("addr", addr); // 주소
    	    			dataMap.put("jibun", jibun); // 지번
    	    			dataMap.put("bonbun", bonbun); // 본번
    	    			dataMap.put("geom", geomJson.toString()); // GEOMETRY 데이터
    	    			//dataMap.put("bubun", bubun); // 부번
    	    			//dataMap.put("gosi_year", gosi_year); // 고시년
    	    			//dataMap.put("gosi_month", gosi_month); // 고시월
    	    			//dataMap.put("jiga", jiga); // 지가
    	
    	    			dataList = new ArrayList<Map<String,Object>>();
    	    			dataList.add(dataMap);
    	
    	    			// tb_cbnd_info(연속지적도) insert
    	    			this.insertCbndData(dataList);
    	    			count++;
    	    		}
    	    	}
			}
    		total = 0;
    	}
	}

	// 행정구역 api
	@Override
	@Transactional
	public void legaldongAPIDo() throws Exception {
		String targerURL = prop.getProperty("vworld.legaldong.requestURL"); // 요청 URL주소
		String key = prop.getProperty("vworld.legaldong.authKey"); // API KEY값
		String domain = prop.getProperty("vworld.legaldong.domainURL"); // 신청한 도메인 URL주소
		String service = prop.getProperty("vworld.legaldong.service");// 요청 서비스명
		String request = prop.getProperty("vworld.legaldong.request"); // 요청 서비스 오퍼레이션

		String geomFilter = prop.getProperty("vworld.legaldong.geomFilter"); // 요청 지오필터 설정 (전국범위)
		String crs = prop.getProperty("vworld.legaldong.crs"); // 요청 결과좌표계설정

		String data_sido = prop.getProperty("vworld.legaldong_sido.data"); // 조회할 데이터_시도
		String data_sgg = prop.getProperty("vworld.legaldong_sgg.data"); // 조회할 데이터_시군구
		String data_emd = prop.getProperty("vworld.legaldong_emd.data"); // 조회할 데이터_읍면동
		String data_li = prop.getProperty("vworld.legaldong_li.data"); // 조회할 데이터_리

		String size = "1000"; // 한 페이지에 출력될 응답결과 건수. min(1), max(1000)
		String page = "1"; // 페이지 번호
		int total = 1; // 전체 페이지 수
		ArrayList<Map<String, Object>> dataList = null;
		JSONParser parser = null;
		JSONObject json = null;
		String status = "";
		JSONObject pageJson = null;
		JSONArray features = null;
		StringBuffer sbUrl = null;
		StringBuffer response = null;
		URL url = null;
		HttpURLConnection conn = null;
		BufferedReader in = null;
		Map<String, Object> dataMap = null;

		// ** 시도 데이터 **

		// 시도 테이블 데이터 모두 제거
		this.deleteSidoInfo();

		for (int currentPage = 1; currentPage <= total; currentPage++) {

			// 요청 url 및 파라미터
			sbUrl = new StringBuffer();
			sbUrl.append(targerURL);
			sbUrl.append("?service=").append(service);
			sbUrl.append("&request=").append(request);
			sbUrl.append("&data=").append(data_sido);
			sbUrl.append("&key=").append(key);
			sbUrl.append("&domain=").append(domain);
			sbUrl.append("&size=").append("100");
			sbUrl.append("&geomFilter=").append(geomFilter);
			sbUrl.append("&crs=").append(crs);
			sbUrl.append("&page=").append(currentPage);

			// API호출
			try {
				url = new URL(sbUrl.toString());
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");

				// 커넥션 성공시
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					System.out.println("url:" + url);
					in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					response = new StringBuffer();
					String inputLine;
					if (in != null) {
						while ((inputLine = in.readLine()) != null) {
							// 응답 결과 데이터 저장
							response.append(inputLine);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null) {
					conn.disconnect();
				}
				if (in != null) {
					try {
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			parser = new JSONParser();
			json = (JSONObject) parser.parse(response.toString());
			json = (JSONObject) json.get("response");
			status = json.get("status").toString();
			pageJson = (JSONObject) json.get("page");
			total = Integer.parseInt(pageJson.get("total").toString());

			// 데이터 추출
			if (status.equals("OK")) {
				json = (JSONObject) json.get("result");
				json = (JSONObject) json.get("featureCollection");
				features = (JSONArray) json.get("features"); // 형상데이터

				for (int i = 0; i < features.size(); i++) {
					JSONObject tmpJson = (JSONObject) features.get(i);
					JSONObject geomJson = (JSONObject) tmpJson.get("geometry"); // 지오메트리
					JSONObject propJson = (JSONObject) tmpJson.get("properties"); // 속성값
					String sido_cd = propJson.get("ctprvn_cd").toString();
					String sido_nm = propJson.get("ctp_kor_nm").toString();

					// hashmap에 담기
					dataMap = new HashMap<String, Object>();
					dataMap.put("sido_cd", sido_cd); // 시도코드
					dataMap.put("sido_nm", sido_nm); // 시도명
					dataMap.put("geom", geomJson.toString()); // GEOMETRY 데이터
					switch(sido_nm) {
					case "서울특별시" : 
						dataMap.put("alias", "서울");
	       				break;
					case "부산광역시" : 
						dataMap.put("alias", "부산");
						break;
					case "대구광역시" : 
						dataMap.put("alias", "대구");
						break;
					case "인천광역시" : 
						dataMap.put("alias", "인천");
						break;
					case "광주광역시" : 
						dataMap.put("alias", "광주");
						break;
					case "대전광역시" : 
						dataMap.put("alias", "대전");
						break;
					case "울산광역시" : 
						dataMap.put("alias", "울산");
						break;
					case "세종특별자치시" : 
						dataMap.put("alias", "세종");
						break;
					case "경기도" : 
						dataMap.put("alias", "경기");
						break;
					case "강원도" : 
						dataMap.put("alias", "강원");
						break;
					case "강원특별자치도" : 
						dataMap.put("alias", "강원");
						break;
					case "충청북도" : 
						dataMap.put("alias", "충북");
						break;
					case "충청남도" : 
						dataMap.put("alias", "충남");
						break;
					case "전라북도" : 
						dataMap.put("alias", "전북");
						break;
					case "전라남도" : 
						dataMap.put("alias", "전남");
						break;
					case "경상북도" : 
						dataMap.put("alias", "경북");
						break;
					case "경상남도" : 
						dataMap.put("alias", "경남");
						break;
					case "제주특별자치도" : 
						dataMap.put("alias", "제주");
						break;
					}
					
					dataList = new ArrayList<Map<String, Object>>();
					dataList.add(dataMap);

					// tb_legaldong_sido(시도데이터) insert
					this.insertSidoData(dataList);
				}
			}
			System.out.println("total : " + total + ", currentPage : " + currentPage + ", size : 100");
		}
		// sido_end

		// ** 시군구 데이터 **

		// 시군구 테이블 데이터 모두 제거
		this.deleteSggInfo();

		for (int currentPage = 1; currentPage <= total; currentPage++) {

			// 요청 url 및 파라미터
			sbUrl = new StringBuffer();
			sbUrl.append(targerURL);
			sbUrl.append("?service=").append(service);
			sbUrl.append("&request=").append(request);
			sbUrl.append("&data=").append(data_sgg);
			sbUrl.append("&key=").append(key);
			sbUrl.append("&domain=").append(domain);
			sbUrl.append("&size=").append("100");
			sbUrl.append("&geomFilter=").append(geomFilter);
			sbUrl.append("&crs=").append(crs);
			sbUrl.append("&page=").append(currentPage);

			// API호출
			try {
				url = new URL(sbUrl.toString());
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");

				// 커넥션 성공시
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					System.out.println("url:" + url);
					in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					response = new StringBuffer();
					String inputLine;
					if (in != null) {
						while ((inputLine = in.readLine()) != null) {
							// 응답 결과 데이터 저장
							response.append(inputLine);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null) {
					conn.disconnect();
				}
				if (in != null) {
					try {
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			parser = new JSONParser();
			json = (JSONObject) parser.parse(response.toString());
			json = (JSONObject) json.get("response");
			status = json.get("status").toString();
			pageJson = (JSONObject) json.get("page");
			total = Integer.parseInt(pageJson.get("total").toString());

			// 데이터 추출
			if (status.equals("OK")) {
				json = (JSONObject) json.get("result");
				json = (JSONObject) json.get("featureCollection");
				features = (JSONArray) json.get("features"); // 형상데이터

				for (int i = 0; i < features.size(); i++) {
					JSONObject tmpJson = (JSONObject) features.get(i);
					JSONObject geomJson = (JSONObject) tmpJson.get("geometry"); // 지오메트리
					JSONObject propJson = (JSONObject) tmpJson.get("properties"); // 속성값
					String sgg_cd = propJson.get("sig_cd").toString();
					String sgg_nm = propJson.get("sig_kor_nm").toString();

					// hashmap에 담기
					dataMap = new HashMap<String, Object>();
					dataMap.put("sgg_cd", sgg_cd); // sgg코드
					dataMap.put("sgg_nm", sgg_nm); // sgg명
					// dataMap.put("sido_cd", sgg_cd.trim().substring(0,1)); // sido_cd
					dataMap.put("geom", geomJson.toString()); // GEOMETRY 데이터

					dataList = new ArrayList<Map<String, Object>>();
					dataList.add(dataMap);

					// tb_legaldong_sgg(시도데이터) insert
					this.insertSggData(dataList);
				}
			}
			System.out.println("total : " + total + ", currentPage : " + currentPage + ", size : 100");
		}
		// sgg_end

		// ** 읍면동 데이터 **

		// 읍면동 테이블 데이터 모두 제거
		this.deleteEmdInfo();

		for (int currentPage = 1; currentPage <= total; currentPage++) {

			// 요청 url 및 파라미터
			sbUrl = new StringBuffer();
			sbUrl.append(targerURL);
			sbUrl.append("?service=").append(service);
			sbUrl.append("&request=").append(request);
			sbUrl.append("&data=").append(data_emd);
			sbUrl.append("&key=").append(key);
			sbUrl.append("&domain=").append(domain);
			sbUrl.append("&size=").append(size);
			sbUrl.append("&geomFilter=").append(geomFilter);
			sbUrl.append("&crs=").append(crs);
			sbUrl.append("&page=").append(currentPage);

			// API호출
			try {
				url = new URL(sbUrl.toString());
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");

				// 커넥션 성공시
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					System.out.println("url:" + url);
					in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					response = new StringBuffer();
					String inputLine;
					if (in != null) {
						while ((inputLine = in.readLine()) != null) {
							// 응답 결과 데이터 저장
							response.append(inputLine);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null) {
					conn.disconnect();
				}
				if (in != null) {
					try {
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			parser = new JSONParser();
			json = (JSONObject) parser.parse(response.toString());
			json = (JSONObject) json.get("response");
			status = json.get("status").toString();
			pageJson = (JSONObject) json.get("page");
			total = Integer.parseInt(pageJson.get("total").toString());

			// 데이터 추출
			if (status.equals("OK")) {
				json = (JSONObject) json.get("result");
				json = (JSONObject) json.get("featureCollection");
				features = (JSONArray) json.get("features"); // 형상데이터

				for (int i = 0; i < features.size(); i++) {
					JSONObject tmpJson = (JSONObject) features.get(i);
					JSONObject geomJson = (JSONObject) tmpJson.get("geometry"); // 지오메트리
					JSONObject propJson = (JSONObject) tmpJson.get("properties"); // 속성값
					String emd_cd = propJson.get("emd_cd").toString();
					String emd_nm = propJson.get("emd_kor_nm").toString();
					String full_nm = propJson.get("full_nm").toString();

					// hashmap에 담기
					dataMap = new HashMap<String, Object>();
					dataMap.put("emd_cd", emd_cd); // emd코드
					dataMap.put("emd_nm", emd_nm); // emd명

					// dataMap.put("sido_cd", emd_cd.trim().substring(0,1)); // sido_cd
					dataMap.put("sido_nm", full_nm.split(" ")[0].trim()); // sido_nm
					// dataMap.put("sgg_cd", emd_cd.trim().substring(0,4)); // sgg_cd
					dataMap.put("sgg_nm", full_nm.split(" ")[1].trim()); // sgg_nm
					dataMap.put("geom", geomJson.toString()); // GEOMETRY 데이터

					dataList = new ArrayList<Map<String, Object>>();
					dataList.add(dataMap);

					// tb_legaldong_emd(읍면동데이터) insert
					this.insertEmdData(dataList);
				}
			}
			System.out.println("total : " + total + ", currentPage : " + currentPage + ", size : " + size);
		}
		// emd_end

		// ** 리 데이터 **

		// 리 테이블 데이터 모두 제거
		this.deleteLiInfo();

		for (int currentPage = 1; currentPage <= total; currentPage++) {

			// 요청 url 및 파라미터
			sbUrl = new StringBuffer();
			sbUrl.append(targerURL);
			sbUrl.append("?service=").append(service);
			sbUrl.append("&request=").append(request);
			sbUrl.append("&data=").append(data_li);
			sbUrl.append("&key=").append(key);
			sbUrl.append("&domain=").append(domain);
			sbUrl.append("&size=").append(size);
			sbUrl.append("&geomFilter=").append(geomFilter);
			sbUrl.append("&crs=").append(crs);
			sbUrl.append("&page=").append(currentPage);

			// API호출
			try {
				url = new URL(sbUrl.toString());
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");

				// 커넥션 성공시
				if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
					System.out.println("url:" + url);
					in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					response = new StringBuffer();
					String inputLine;
					if (in != null) {
						while ((inputLine = in.readLine()) != null) {
							// 응답 결과 데이터 저장
							response.append(inputLine);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null) {
					conn.disconnect();
				}
				if (in != null) {
					try {
						in.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			parser = new JSONParser();
			json = (JSONObject) parser.parse(response.toString());
			json = (JSONObject) json.get("response");
			status = json.get("status").toString();
			pageJson = (JSONObject) json.get("page");
			total = Integer.parseInt(pageJson.get("total").toString());

			// 데이터 추출
			if (status.equals("OK")) {
				json = (JSONObject) json.get("result");
				json = (JSONObject) json.get("featureCollection");
				features = (JSONArray) json.get("features"); // 형상데이터

				for (int i = 0; i < features.size(); i++) {
					JSONObject tmpJson = (JSONObject) features.get(i);
					JSONObject geomJson = (JSONObject) tmpJson.get("geometry"); // 지오메트리
					JSONObject propJson = (JSONObject) tmpJson.get("properties"); // 속성값
					String li_cd = propJson.get("li_cd").toString();
					String li_nm = propJson.get("li_kor_nm").toString();
					String full_nm = propJson.get("full_nm").toString();

					// hashmap에 담기
					dataMap = new HashMap<String, Object>();
					dataMap.put("li_cd", li_cd); // li코드
					dataMap.put("li_nm", li_nm); // li명
					// dataMap.put("emd_cd", li_cd.trim().substring(0,7)); // emd_cd
					dataMap.put("geom", geomJson.toString()); // GEOMETRY 데이터

					dataList = new ArrayList<Map<String, Object>>();
					dataList.add(dataMap);

					// tb_legaldong_li(리데이터) insert
					this.insertLiData(dataList);
				}
			}
			System.out.println("total : " + total + ", currentPage : " + currentPage + ", size : " + size);
		}
		// li_end

	}

	// -- 시도
	@Override
	public void insertSidoData(ArrayList<Map<String, Object>> paraList) {
		dataCntcMapper.insertSidoData(paraList);
	}

	@Override
	public void deleteSidoInfo() throws Exception {
		dataCntcMapper.deleteSidoInfo();
	}

	// -- 시군구
	@Override
	public void insertSggData(ArrayList<Map<String, Object>> paraList) {
		dataCntcMapper.insertSggData(paraList);
	}

	@Override
	public void deleteSggInfo() throws Exception {
		dataCntcMapper.deleteSggInfo();
	}

	// -- 읍면동
	@Override
	public void insertEmdData(ArrayList<Map<String, Object>> paraList) {
		dataCntcMapper.insertEmdData(paraList);
	}

	@Override
	public void deleteEmdInfo() throws Exception {
		dataCntcMapper.deleteEmdInfo();
	}

	// -- 리
	@Override
	public void insertLiData(ArrayList<Map<String, Object>> paraList) {
		dataCntcMapper.insertLiData(paraList);
	}

	@Override
	public void deleteLiInfo() throws Exception {
		dataCntcMapper.deleteLiInfo();
	}

	@Override
	public List<Map<String, Object>> selectRoadInfoList(String resultno) throws Exception {
		return dataCntcMapper.selectRoadInfoList(resultno);
	}

	@Override
	public List<Map<String, Object>> selectRoadLayerList(String resultno) throws Exception {
		return dataCntcMapper.selectRoadLayerList(resultno);
	}

	// krris 도로대장 데이터 API 호출 및 데이터 적재
	@Override
	@Transactional
    public void setLayerInfo(String pRoadNo, String pLayerId, String pSect, String pLayNm, String pLayColor, String PLayImg) throws Exception{
    	String targerURL = prop.getProperty("krris.requestURL"); // 요청 주소
    	String scrtkyCn = prop.getProperty("krris.authKey"); // 신청한 API KEY 값
    	String localIp = prop.getProperty("krris.localURL"); // API 신청한 URL 주소
    	String roadNo = pRoadNo; // 도로의 노선번호 4자리(필수)
    	String layerId = pLayerId; // 도로대장 레이어 물리명(레이어명 참조)(필수)
    	String sect = pSect; // 도로의 구간번호 2자리(필수)   	
    	StringBuffer sbUrl = new StringBuffer();
    	StringBuffer response = new StringBuffer();
    	URL url = null;
    	HttpURLConnection conn = null;
    	BufferedReader in = null;
    	JSONParser parser = null;
        JSONObject json = null;
    	sbUrl.append(targerURL);
    	sbUrl.append("?roadNo=").append(roadNo);
    	sbUrl.append("&layerId=").append(layerId);
    	sbUrl.append("&sect=").append(sect);
    	sbUrl.append("&scrtkyCn=").append(scrtkyCn);
    	
		// 요청 정보
    	Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("roadNo", pRoadNo);
		dataMap.put("sect", pSect);
		dataMap.put("layNm", pLayNm);
		dataMap.put("resultYN", "N");
		
		// 해당 레이어 데이터 카운트 조회
		int resultCnt = dataCntcMapper.selectRoadLayerDataCnt(dataMap);
		// 해당 레이어 요청 데이터 카운트 조회
		int resultFlagCnt = dataCntcMapper.selectRoadLayerDataFlagCnt(dataMap);

		if(resultCnt > 0 || resultFlagCnt > 0) {
			return;
		}
		
		// 클라이언트 요청 정보 적재
		dataCntcMapper.insertRoadLayerDataFlag(dataMap);

    	try {
    		url = new URL(sbUrl.toString());
    		conn = (HttpURLConnection)url.openConnection();
    		conn.setRequestMethod("GET"); 
    		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
    		conn.setRequestProperty("referer", localIp); 
    		conn.setDoOutput(true); 
    		if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
    			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    			String inputLine; 
    			if(in != null){
    				while ((inputLine = in.readLine()) != null) { 
    					response.append(inputLine.toString());
    				} 
    			}
    		}
    	}finally{
    		if(conn!=null) {
				conn.disconnect();
			}
    		if (in!=null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
    	}
    	
    	if(response.toString().length() > 0) {
    		List<Map<String, Object>> dataList = new ArrayList<>();
    		parser = new JSONParser();
			json = (JSONObject) parser.parse(response.toString());
			JSONArray features = new JSONArray();
			features = (JSONArray) json.get("features");
			
			if(features != null) {
				for (int i = 0; i < features.size(); i++){
					Map<String, Object> map = new HashMap<>();
					JSONObject obj = new JSONObject();
					JSONObject geometry = new JSONObject();
					JSONObject properties = new JSONObject();
					obj = (JSONObject)features.get(i);
					properties = (JSONObject) obj.get("properties");
					geometry = (JSONObject) obj.get("geometry");
					
					map.put("roadNo", properties.get("roadNo").toString());
					map.put("sect", properties.get("sect").toString());
					map.put("roadName", properties.get("roadName").toString());
					map.put("geometry", geometry.toString());
					map.put("layNm", pLayNm);
					map.put("layColor", pLayColor);
					map.put("layImg", PLayImg);
					dataList.add(map);
				}
				
				dataCntcMapper.insertRoadLayerData(dataList);
				
			}
    	}
    	// 요청 클라이언트 요청 정보 업데이트
    	dataMap.remove("resultYN");
    	dataMap.put("resultYN", "Y");
    	dataCntcMapper.updateRoadLayerDataFlag(dataMap);
    }
	
	
	// krris 도로대장 데이터 API 요청 결과
	@Override
	@Transactional
	public String checkLayerInfo(String roadNo, String sect, String layNm)
			throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String resultYn = "N";
		
		// 요청 정보
    	Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("roadNo", roadNo);
		dataMap.put("sect", sect);
		dataMap.put("layNm", layNm);
		
		// 요청 클라이언트 요청 정보 조회
		resultMap = dataCntcMapper.selectRoadLayerDataFlag(dataMap);
		resultYn = resultMap == null? "N":resultMap.get("resultYn").toString();
		return resultYn;
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> selectRoadLayerDataList(Map<String, Object> dataMap) throws Exception {
		return dataCntcMapper.selectRoadLayerDataList(dataMap);
	}
	
	@Override
	@Transactional
	public void deleteRoadLayerDataFlag() throws Exception {
		dataCntcMapper.deleteRoadLayerDataFlag();
	}
	
	
	

	

	
}
