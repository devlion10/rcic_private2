package kr.or.lx.rcic.modules.shpimport.service.impl;

import java.io.File;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.io.FilenameUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.store.ContentFeatureCollection;
import org.geotools.data.store.ContentFeatureSource;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.opengis.feature.Property;
import org.opengis.feature.simple.SimpleFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.or.lx.rcic.frmwrk.user.SecurityUtil;
import kr.or.lx.rcic.modules.dataCntc.service.impl.DataCntcServiceImpl;
import kr.or.lx.rcic.modules.shpimport.entity.DicUpload;
import kr.or.lx.rcic.modules.shpimport.mapper.ShpImportMapper;
import kr.or.lx.rcic.modules.shpimport.service.ShpImportService;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ShpImportServiceImpl implements ShpImportService {

    @Autowired
    ShpImportMapper mapper;
    
//    @Autowired
//    private SqlSessionFactory sqlSessionFactory;
//    
//    private SqlSession sqlsession;

    @Value("#{contextProperties}")
    Properties prop = new Properties();

    final String SHP_UPLOAD_DIR = "shpimport";

    @Transactional
    public void truncateTable(String tableName) throws Exception {
        String tbl = tableName.toLowerCase();
        switch (tbl) {
            case "tl_develop_info":
                mapper.truncateDevelopInfo();
                break;
            case "tl_road_plan_info":
                mapper.truncateRoadPlanInfo();
                break;
            case "tl_moct_link_line":
                mapper.truncateMoctLinkLine();
                break;
            case "tl_cdpnt_sgnal_info":
                mapper.truncateCdpntSgnalInfo();
                break;
            case "tl_center_line":
                mapper.truncateCenterLine();
                break;
            case "tb_legaldong_sido":
            	mapper.truncateLegaldongSido();
            	break;
            case "tb_legaldong_sgg":
            	mapper.truncateLegaldongSgg();
            	break;
            case "tb_legaldong_emd":
            	mapper.truncateLegaldongEmd();
            	break;
            case "tb_legaldong_li":
            	mapper.truncateLegaldongLi();
            	break;
            case "tb_cbnd_all":
            	mapper.truncateCbndAll();
            	break;
            case "tb_cbnd_change":
            	mapper.truncateCbndChange();
            	break;
            default:
                throw new RuntimeException("Unsupported table: " + tableName);
        }
    }

    /**
     * 데이터 저장
     * @param tableName
     * @param dataList
     * @throws Exception
     */
    @Transactional
    public void insertDataList(String tableName, List<Map<String, Object>> dataList) throws Exception {
        String tbl = tableName.toLowerCase();
        switch (tbl) {
            case "tl_develop_info":
                mapper.insertDevelopInfo(dataList);
                break;
            case "tl_road_plan_info":
                mapper.insertRoadPlanInfo(dataList);
                break;
            case "tl_moct_link_line":
                mapper.insertMoctLinkLine(dataList);
                break;
            case "tl_cdpnt_sgnal_info":
                mapper.insertCdpntSgnalInfo(dataList);
                break;
            case "tl_center_line":
                mapper.insertCenterLine(dataList);
                break;
            case "tb_legaldong_sido":
            	mapper.insertLegaldongSido(dataList);
            	break;
            case "tb_legaldong_sgg":
            	mapper.insertLegaldongSgg(dataList);
            	break;
            case "tb_legaldong_emd":
            	mapper.insertLegaldongEmd(dataList);
            	mapper.insertLegaldongEmdUdtSidoNm();
            	mapper.insertLegaldongEmdUdtSggNm();
            	break;
            case "tb_legaldong_li":
            	mapper.insertLegaldongLi(dataList);
            	break;
            	
            //연속지적도
            case "tb_cbnd_all":
            	mapper.insertCbndAll(dataList);
            	mapper.updateCbndLegaldongCd(dataList);
            	break;
            case "tb_cbnd_change":
            	mapper.insertCbndChange(dataList);
            	break;
            default:
                throw new RuntimeException("Unsupported table: " + tableName);
        }
    }

    /**
     * 쉪 파일 서버 업로드 후 저장
     * @param dicUpload
     * @return
     * @throws Exception
     */
    @Override
    @Transactional
    public DicUpload insertShpData(DicUpload dicUpload) throws Exception {

        // 전체 삭제
        truncateTable(dicUpload.getDicTblNm());
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uploadDir = prop.getProperty("uploadBaseDir");

        String saveDirPath = String.format("%s/%s/%s/", uploadDir,  SHP_UPLOAD_DIR, timestamp);
        File saveDir = new File(saveDirPath);
        saveDir.mkdirs();

        List<MultipartFile> multipartFiles = dicUpload.getShpFiles();

        String shpFileFullPath = null;
        for (MultipartFile mf : multipartFiles) {
            if (mf.getSize() == 0) continue;

            String originalFilename = mf.getOriginalFilename();

            String saveFilePath = saveDirPath + timestamp + "_" + originalFilename;
            File saveFile = new File(saveFilePath);
            mf.transferTo(saveFile);

            if ("shp".equalsIgnoreCase(FilenameUtils.getExtension(originalFilename))) {
                shpFileFullPath = saveFilePath;
            }
        }

        // 서버에서 읽기
        File file = new File(shpFileFullPath);
        ShapefileDataStore dataStore = new ShapefileDataStore(file.toURL());
        if(dicUpload.getDicTblNm().startsWith("tb_legaldong")) {
        	dataStore.setCharset(Charset.forName("EUC-KR"));
        }else{
        	dataStore.setCharset(Charset.forName("UTF-8"));
        }
        SimpleFeatureTypeBuilder featureTypeBuilder = new SimpleFeatureTypeBuilder();
        ContentFeatureSource featureSource = dataStore.getFeatureSource();
        ContentFeatureCollection featureCollection = featureSource.getFeatures();
        featureTypeBuilder.init(featureCollection.getSchema());
        SimpleFeatureIterator iterator = featureCollection.features();

        List<Map<String, Object>> arrayList = new ArrayList<>();
        long cnt=0;
        while(iterator.hasNext()) {

            // 100개 단위로 커밋
            if( (cnt % 100 == 0) && cnt > 0){
                insertDataList(dicUpload.getDicTblNm(), arrayList);
                arrayList.clear();
            }
            SimpleFeature feature = iterator.next();

            Map<String, Object> map = new LinkedHashMap<>();
            List<Object>  attributes = feature.getAttributes(); // values
            Iterator propertyIterator = feature.getProperties().iterator();

            int propIdx = 0;
            while (propertyIterator.hasNext()) {
                Property prop = (Property) propertyIterator.next();
                String name = prop.getName().toString();

                map.put(name, attributes.get(propIdx));
                propIdx ++;
            }

            // FIXME TODO 샘플 파일에 geom 이름이 없어서 임의로 the_geom을 넣음
            if (map.get("the_geom") != null && map.get("geom") == null) {
                map.put("geom", map.get("the_geom"));
            }

            arrayList.add(map);
            cnt++;
        }

        insertDataList(dicUpload.getDicTblNm(), arrayList);
        dataStore.dispose();

        dicUpload.setCrtCnt(cnt);
        dicUpload.setRegistId(SecurityUtil.getCurrentUserId());

        mapper.insertDicUploadHist(dicUpload);

        return dicUpload;
    }

    @Override
    public String getLastDicUploadHist(String tableName) throws Exception {
        return mapper.getLastDicUploadHist(tableName);
    }
    
//    @Override
//	public int vacuuming(String tableName) {
//    	//sqlsession = sqlSessionFactory.openSession(false);
//		int result = mapper.vacuuming(tableName);
//		//sqlsession.commit();
//		//sqlsession = sqlSessionFactory.openSession(true);
//		
//		return result;
//	}
    
    @Override
    @Transactional
    public DicUpload insertCbndData(DicUpload dicUpload) throws Exception {

        // 전체 삭제
        truncateTable(dicUpload.getDicTblNm());
    	
    	// 파일경로 & 파일명 정의 후 저장
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uploadDir = prop.getProperty("uploadBaseDir");

        String saveDirPath = String.format("%s/%s/%s/", uploadDir,  SHP_UPLOAD_DIR, timestamp);
        File saveDir = new File(saveDirPath);
        saveDir.mkdirs();

        List<MultipartFile> multipartFiles = dicUpload.getShpFiles();

        String zipFileFullPath = null;
        String shpFileFullPath = null;
        for (MultipartFile mf : multipartFiles) {
            if (mf.getSize() == 0) continue;

            String originalFilename = mf.getOriginalFilename();

            String saveFilePath = saveDirPath + timestamp + "_" + originalFilename;
            File saveFile = new File(saveFilePath);
            mf.transferTo(saveFile);

            if ("zip".equalsIgnoreCase(FilenameUtils.getExtension(originalFilename))) {
                zipFileFullPath = saveFilePath;
            }
            
            if ("shp".equalsIgnoreCase(FilenameUtils.getExtension(originalFilename))) {
            	zipFileFullPath = saveFilePath;
            }
            
            System.out.println(saveDirPath+", " + timestamp + "_" + originalFilename);
            
            // 압축 해제
            DataCntcServiceImpl.unZip(saveDirPath, timestamp + "_" + originalFilename);
        }
        
        
        // shp파일 read
        
        File file = new File(shpFileFullPath);
        ShapefileDataStore dataStore = new ShapefileDataStore(file.toURL());
        if(dicUpload.getDicTblNm().startsWith("tb_legaldong")) {
        	dataStore.setCharset(Charset.forName("EUC-KR"));
        }else{
        	dataStore.setCharset(Charset.forName("UTF-8"));
        }
        SimpleFeatureTypeBuilder featureTypeBuilder = new SimpleFeatureTypeBuilder();
        ContentFeatureSource featureSource = dataStore.getFeatureSource();
        ContentFeatureCollection featureCollection = featureSource.getFeatures();
        featureTypeBuilder.init(featureCollection.getSchema());
        SimpleFeatureIterator iterator = featureCollection.features();

        List<Map<String, Object>> arrayList = new ArrayList<>();
        long cnt=0;
        while(iterator.hasNext()) {

            // 100개 단위로 커밋
            if( (cnt % 100 == 0) && cnt > 0){
                insertDataList(dicUpload.getDicTblNm(), arrayList);
                arrayList.clear();
            }
            SimpleFeature feature = iterator.next();

            Map<String, Object> map = new LinkedHashMap<>();
            List<Object>  attributes = feature.getAttributes(); // values
            Iterator propertyIterator = feature.getProperties().iterator();

            int propIdx = 0;
            while (propertyIterator.hasNext()) {
                Property prop = (Property) propertyIterator.next();
                String name = prop.getName().toString();

                map.put(name, attributes.get(propIdx));
                propIdx ++;
            }

            // FIXME TODO 샘플 파일에 geom 이름이 없어서 임의로 the_geom을 넣음
            if (map.get("the_geom") != null && map.get("geom") == null) {
                map.put("geom", map.get("the_geom"));
            }

            arrayList.add(map);
            cnt++;
        }

        insertDataList(dicUpload.getDicTblNm(), arrayList);
        dataStore.dispose();

        dicUpload.setCrtCnt(cnt);
        dicUpload.setRegistId(SecurityUtil.getCurrentUserId());

        mapper.insertDicUploadHist(dicUpload);
        
        
        
        
        
        return dicUpload;
    }

}



