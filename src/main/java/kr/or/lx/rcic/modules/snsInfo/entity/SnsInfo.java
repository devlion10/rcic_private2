package kr.or.lx.rcic.modules.snsInfo.entity;

import lombok.Data;

/**
 *  SNS(트위터)에서 수집된 정보를 관리한다.  */

@Data
public class SnsInfo {

    /**
     * sns_no
     */
    private Long snsNo;
    /**
     * 1: twitter, 2: facebook
     */
    private String snsType;
    /**
     * 키워드
     */
    private String snsKeyword;
    /**
     * 컨텐츠
     */
    private String snsContent;
    /**
     * sns_계정
     */
    private String snsAccount;
    /**
     * sns_url
     */
    private String snsUrl;
    /**
     * sns_수집시각
     */
    private String snsRegistDt;
    /**
     * sns_글등록시간
     */
    private String snsCreateDt;
    /**
     * sns_profile_img
     */
    private String snsProfileImg;
    /**
     * sns_ID
     */
    private String snsId;
    /**
     * sns_프로필 백그라운드 컬러
     */
    private String snsProfileBackgroundColor;
    /**
     * sns_프로필 텍스트 컬러
     */
    private String snsProfileTextColor;
    /**
     * sns_profile_https_img
     */
    private String snsProfileHttpsImg;
    /**
     * sns_name
     */
    private String snsName;
    /**
     * sns_description
     */
    private String snsDescription;
    /**
     * sns수집 기준일
     */
    private String stdrDt;
    /**
     * 타이머
     */
    private String snsTimer;
    /**
     * UTM-K X좌표
     */
    private Integer utmkX;
    /**
     * UTM-K Y좌표
     */
    private Integer utmkY;

    public boolean hasPk() {
        return snsNo != null && snsId != null && snsNo != null && snsId != null;
    }

}