package kr.or.lx.rcic.modules.analysisInfo.service.impl;

import de.siegmar.fastcsv.writer.CsvAppender;
import de.siegmar.fastcsv.writer.CsvWriter;
import kr.co.timosoft.util.PaginationUtil;
import kr.or.lx.rcic.egovframework.cmmn.util.StringUtils;
import kr.or.lx.rcic.modules.analysisInfo.mapper.AnalysisInfoMapper;
import kr.or.lx.rcic.modules.analysisInfo.service.AnalysisInfoFileService;
import kr.or.lx.rcic.modules.analysisInfo.service.AnalysisInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service(value = "analysisInfoCsvService")
@Slf4j
public class AnalysisInfoCsvService implements AnalysisInfoFileService {

    @Autowired
    private AnalysisInfoService analysisInfoService;

    @Autowired
    private AnalysisInfoMapper mapper;

    private final List<String> HEADER_FIELDS;
    private final List<String> HEADER_NAMES;

    AnalysisInfoCsvService() {
        this.HEADER_FIELDS = Arrays.asList("bidntceno", "bidntceord", "ntcekindnm", "ntceinsttnm", "bidntcenm", "bidntcedt", "bidntcedtlurl", "refno"     , "dminsttcd"  , "dminsttnm", "sido_cd", "sgg_cd"    , "emd_cd", "forecast_st_dt", "forecast_end_dt", "road_ty_nm", "fac_ty_nm", "loc_accu_clss", "national_highway_no", "point_geom", "line_geom");
        this.HEADER_NAMES = Arrays.asList("입찰공고번호", "입찰공고차수", "공고종류명", "공고기관명", "공고명", "입찰공고일시", "조달청 공고URL", "관련공고번호", "수요기관코드", "수요기관명", "시도코드", "시군구코드", "읍면동코드", "공사예측시작일", "공사예측종료일", "공사종류", "시설종류", "예측위치정확도분류", "도로번호", "예측위치 POINT", "예측도로라인 공간정보");
    }

    @Override
    public File generateExcel(Map param, String filePath, String fileName) throws Exception {

        File saveDir = new File(filePath);
        if (!saveDir.exists()) saveDir.mkdirs();
        File saveFile = new File(filePath + "/" + fileName);

        CsvWriter csvWriter = new CsvWriter();
        csvWriter.setFieldSeparator('|');
        try (CsvAppender csvAppender = csvWriter.append(saveFile, StandardCharsets.UTF_8))  {


            int listCnt = 100;
            int totalCnt = mapper.getAnalysisInfoFileDataCnt(param);
            int maxPageCnt = PaginationUtil.maxPageCnt(totalCnt, listCnt);

            int rowIndex = 0;

            // header
            for (int i = 0; i < HEADER_NAMES.size(); i++) {
                csvAppender.appendField(HEADER_NAMES.get(i));
            }
            csvAppender.endLine();

            // 조회하며 스트리밍 생성
            param.put("listCnt", listCnt);
            for (int currPage = 1; currPage <= maxPageCnt; currPage++) {
                param.put("currPage", currPage);

                List<Map<String, Object>> list = analysisInfoService.getAnalysisInfoFileData(param);
                for (Map<String, Object> rowItem : list) {

                    for (String fieldName : HEADER_FIELDS) {
                        String value = StringUtils.nullToStr(rowItem.get(fieldName));
                        csvAppender.appendField(value);
                    }
                    csvAppender.endLine();;
                }
                csvAppender.flush();
            }

            csvAppender.flush();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            e.printStackTrace();
        } finally {
        }

        return saveFile;
    }



}
