package kr.or.lx.rcic.modules.initiationReport.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class InitiationReportDTO {


    /**
     * 코드아이디
     */
    private String cdid;

    /**
     * 코드키
     */
    private String cdkey;

    /**
     * 코드명
     */
    private String cdvalue;

    /**
     * 유저id(등록자id)
     */
    private String regId;

    /**
     * 시도코드
     */
    private String sido;

    /**
     * 시군구코드
     */
    private String sgg;

    /**
     * 읍면동 코드
     */
    private String emd;

    /**
     * 시도명
     */
    private String sidoNm;

    /**
     * 시군구명
     */
    private String sggNm;

    /**
     * 읍면동명
     */
    private String emdNm;

    /**
     * 대지/산코드
     */
    private String earthMountainCd;

    /**
     * 대지/산명
     */
    private String earthMountainNm;

    /**
     * 지번-본번
     */
    private String bon;

    /**
     * 지번-부번
     */
    private String bu;

    /**
     * 키워드(selectBox)
     */
    private String keywordSb;

    /**
     * 키워드명
     */
    private String keyword;

    /**
     * 착수신고서 순번
     */
    private Long seq;

    /**
     * 입찰공고차수
     */
    private String bidntceord;

    /**
     * 공고종류(일반,긴급,변경,재입찰)
     */
    private String ntcekindnm;

    /**
     * 공고기관명
     */
    private String ntceinsttnm;

    /**
     * 입찰공고일시(YYYY-MM-DD HH24:MM:SS)
     */
    private String bidntcedt;

    /**
     * g2b입찰공고상세url
     */
    private String bidntcedtlurl;

    /**
     * 관련공고번호
     */
    private String refno;

    /**
     * 수요기관코드
     */
    private String dminsttcd;

    /**
     * 수요기관명
     */
    private String dminsttnm;

    /**
     * 공사예측장소의시도코드
     */
    private String sido_cd;

    /**
     * 공사예측장소의시군구코드
     */
    private String sgg_cd;

    /**
     * 공사예측장소읍면동코드
     */
    private String emd_cd;

    /**
     * 공사예측시작일(YYYMMDD)
     */
    private String forecast_st_dt;

    /**
     * 공사예측종료일(YYYMMDD 공고문 내 공사일수+30일)
     */
    private String forecast_end_dt;

    /**
     * 입찰공고에 대해 예측된 공사종류(콤마로구분된 공사 종류명)
     */
    private String road_ty_nms;

    /**
     * 입찰공고에대해 예측된 시설종류(콤마로구분된 시설종류명)
     */
    private String fac_ty_nms;

    /**
     * 예측위치 정확도 분류
     */
    private String loc_accu_clss;

    /**
     * 공사예측된 도로번호(국도의번호)
     */
    private String road_no;

    /**
     * 공사에측도로의라인공간정보MULTILINESTLING(123,123,124)
     */
    private String line_geom;

    /**
     * 계약일자(YYYY-MM-DD)
     */
    private String cntrctcnclsdate;

    /**
     * 계약금액
     */
    private String thtmcntrctamt;

    /**
     * 착공일자(YYYY-MM-DD)
     */
    private String cbgndate;

    /**
     * 준공일자(준공기한일자 YYYY-MM-DD)
     */
    private String thtmccmpltdate;

    /**
     * 공사예측도로의점공간정보POINT(1231241.124,1234242.1234)WKT포맷(좌표계EPSG3857)
     */
    private String point_geom;

    /**
     * DATA INSERT LOG
     */
    private String timestamp;


    /**
     * TB_ANALYSIS_INFO 관리청_분석 테이블
     */

    /**
     * rn 순번
     */
    private String rn;

    /**
     * g2b입찰공고번호
     */
    private String bidntceno;

    /**
     * 도로종류코드
     */
    private String constRoadClss;

    /**
     * 도로종류명
     */
    private String constRoadNm;

    /**
     * 노선번호(노선명)
     */
    private String routeNm;

    /**
     * 공사종류코드
     */
    private String facTyCd;

    /**
     * 공사종류명
     */
    private String facTyNm;

    /**
     * 공고명
     */
    private String bidntcenm;

    /**
     * 세부공사건수
     */
    private String subCstrnCnt;

    /**
     * 전체공사기간(공사시작일)
     */
    private String cstrnStDt;

    /**
     * 전체공사기간(공사종료일)
     */
    private String cstrnEndDt;

    /**
     * 전체공사기간(공사기간)
     */
    private String cstrnDt;

    /**
     * 도로종류코드
     */
    private String roadTypeCd;

    /**
     * 도로종류명
     */
    private String roadTypeNm;

    /**
     * TB_ANALYSIS_LOC_INFO 관리청_분석 테이블
     */

    /**
     * TB_ANALYSIS_FAC_INFO 관리청_분석 테이블
     */

    /**
     * tl_bmng_info 비관리청 테이블
     */

    /**
     * req_dt
     */
    private String reqDt;

    /**
     * reqType
     */
    private String reqType;

    /**
     * prmsn_no
     */
    private String prmsnNo;

    /**
     * prmsnDt
     */
    private String prmsnDt;

    /**
     * mngrNm
     */
    private String mngrNm;

    /**
     * stateCd
     */
    private String stateCd;

    /**
     * roadType
     */
    private String roadType;

    /**
     * roadNm
     */
    private String roadNm;

    /**
     * ocpyLoc
     */
    private String ocpyLoc;

    /**
     * ocpyArea
     */
    private String ocpyArea;

    /**
     * ocpyPos
     */
    private String ocpyPos;

    /**
     * ocpyDur
     */
    private String ocpyDur;

    /**
     * workStDt
     */
    private String workStDt;

    /**
     * workEnDt
     */
    private String workEnDt;

    /**
     * ocpyPerInfo
     */
    private String ocpyPerInfo;



    /**
     * TB_ANALYSIS_INFO 착수신고서 상세정보 테이블 컬럼 추가
     */

    /**
     * 공사구분정보
     */
    private String workDivisionInfo;

    /**
     * 입찰공고번호유무
     */
    private String bidntcenoyn;

    /**
     * 공사구분정보?
     */
    private String bidntcenoynTxt;

    /**
     * 노선번호(노선명)
     */
    private String roadRteNo;

    /**
     * 업체정보 아이디
     */
    private String dclId;

    /**
     * 신고인 성명
     */
    private String dclNm;

    /**
     * 신고인 사업자등록번호
     */
    private String brno;

    /**
     * 신고인 주민번호
     */
    private String dclRegNum;

    /**
     * 신고인 주민번호 앞자리
     */
    private String dclRegNum1;

    /**
     * 신고인 주민번호 뒷자리
     */
    private String dclRegNum2;

    /**
     * 신고인주소
     */
    private String dclAddr;

    /**
     * 공사종류
     */
    private String cstrnType;

    /**
     * 공사종류코드
     */
    private String cstrnTypeCd;

    /**
     * 공사종류명
     */
    private String cstrnTypeNm;

    /**
     * 관리청코드
     */
    private String ntnltyLandMngOfcCd;

    /**
     * 관리청명
     */
    private String ntnltyLandMngOfcNm;

    /**
     * 공사명 / 조회화면(키워드명)
     */
    private String cstrnNm;

    /**
     * 착수신고서승인여부
     */
    private String initiationRptApprFlag;

    /**
     * 착수신고서승인아이디
     */
    private String approverId;


    /**
     * 착수신고서승인자명
     */
    private String approverNm;

    /**
     * 착수신고서승인일시
     */
    private String approverDt;

    /**
     * 파일(전체공사위치도)
     */
    private MultipartFile cstrnLocMapFile;

    /**
     * 파일 원본파일명(전체공사위치도)
     */
    private String cstrnLocMapFileOriginNm;

    /**
     * 파일명(전체공사위치도)
     */
    private String cstrnLocMapFileNm;

    /**
     * 파일크기(전체공사위치도)
     */
    private Long cstrnLocMapFileSize;

    /**
     * 파일경로(전체공사위치도)
     */
    private String cstrnLocMapFilePath;

    /**
     * 파일경로파트1(아이디)
     */
    private String cstrnLocMapFilePathPartUserId;

    /**
     * 파일경로파트2(날짜)
     */
    private String cstrnLocMapFilePathPartDate;

    /**
     * 파일유형(전체공사위치도)
     */
    private String cstrnLocMapFileType;

    /**
     * 세부공사 DTO List
     */
    private List<InitiationReportDTO> subFormList;

    public List<InitiationReportDTO> getSubFormList() {
        return subFormList;
    }

    public void setSubFormList(List<InitiationReportDTO> subFormList){
        this.subFormList = subFormList;
    }


    /**
     * TB_INITIATION_RPT_SUB 착수신고서 세부공사정보 테이블
     */

    /**
     * 세부공사 - 착수신고서 seq
     */
    private String initRptSeq;

    /**
     * 세부공사순번
     */
    private String initRptSubSeq;

    /**
     * 세부공사명
     */
    private String subCstrnNm;

    /**
     * 세부공사기간(공사시작일)
     */
    private String subCstrnStDt;

    /**
     * 세부공사기간(공사종료일)
     */
    private String subCstrnEndDt;

    /**
     * 공사시점주소(도로명)
     */
    private String subCstrnStRoadAddr;

    /**
     * 공사시점주소(지번)
     */
    private String subCstrnStLocAddr;

    /**
     * 공사시점좌표(경도)
     */
    private String subCstrnStCoodLongitude;

    /**
     * 공사시점좌표(위도)
     */
    private String subCstrnStCoodLatitude;

    /**
     * 공사시점노선방향
     */
    private String subCstrnStDir;

    /**
     * 공사종점주소(도로명주소)
     */
    private String subCstrnEndRoadAddr;

    /**
     * 공사종점주소(지번)
     */
    private String subCstrnEndLocAddr;

    /**
     * 공사종점좌표(경도)
     */
    private String subCstrnEndCoodLongitude;

    /**
     * 공사종점좌표(위도)
     */
    private String subCstrnEndCoodLatitude;

    /**
     * 공사종점노선방향
     */
    private String subCstrnEndDir;

    /**
     * 파일(세부공사위치도)
     */
    private MultipartFile subCstrnLocMapFile;

    /**
     * 파일 원본파일명(세부공사위치도)
     */
    private String subCstrnLocMapFileOriginNm;

    /**
     * 파일명(세부공사위치도)
     */
    private String subCstrnLocMapFileNm;

    /**
     * 파일크기(세부공사위치도)
     */
    private Long subCstrnLocMapFileSize;

    /**
     * 파일경로(세부공사위치도)
     */
    private String subCstrnLocMapFilePath;

    /**
     * 파일유형(세부공사위치도)
     */
    private String subCstrnLocMapFileType;

    /**
     * 파일(세부공사시점)
     */
    private MultipartFile subCstrnStLocMapFile;

    /**
     * 파일 원본파일명(세부공사시점)
     */
    private String subCstrnStLocMapFileOriginNm;

    /**
     * 파일명(세부공사시점)
     */
    private String subCstrnStLocMapFileNm;

    /**
     * 파일크기(세부공사시점)
     */
    private Long subCstrnStLocMapFileSize;

    /**
     * 파일경로(세부공사시점)
     */
    private String subCstrnStLocMapFilePath;

    /**
     * 파일유형(세부공사시점)
     */
    private String subCstrnStLocMapFileType;

    /**
     * 파일(세부공사종점)
     */
    private MultipartFile subCstrnEndLocMapFile;

    /**
     * 파일 원본파일명(세부공사종점)
     */
    private String subCstrnEndLocMapFileOriginNm;

    /**
     * 파일명(세부공사종점)
     */
    private String subCstrnEndLocMapFileNm;

    /**
     * 파일크기(세부공사종점)
     */
    private Long subCstrnEndLocMapFileSize;

    /**
     * 파일경로(세부공사종점)
     */
    private String subCstrnEndLocMapFilePath;

    /**
     * 파일유형(세부공사종점)
     */
    private String subCstrnEndLocMapFileType;

    /**
     * 파일(세부공사대표지점)
     */
    private MultipartFile subCstrnRepsLocMapFile;

    /**
     * 파일 원본파일명(세부공사대표지점)
     */
    private String subCstrnRepsLocMapFileOriginNm;

    /**
     * 파일명(세부공사대표지점)
     */
    private String subCstrnRepsLocMapFileNm;

    /**
     * 파일크기(세부공사대표지점)
     */
    private Long subCstrnRepsLocMapFileSize;

    /**
     * 파일경로(세부공사대표지점)
     */
    private String subCstrnRepsLocMapFilePath;

    /**
     * 파일유형(세부공사대표지점)
     */
    private String subCstrnRepsLocMapFileType;
    private ArrayList<String> jsonData;

}
