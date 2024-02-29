package kr.or.lx.rcic.modules.userMyRoadwork.entity;

import lombok.Data;

/**
 *  업무사용자의 도로공사 관심목록을 관리한다.  */

@Data
public class UserMyRoadwork {

    /**
     * 사용자번호
     */
    private String userSeq;
    /**
     * 시퀀스
     */
    private String seq;
    /**
     * 등록일시
     */
    private String registDt;
    /**
     * 등록아이디
     */
    private String registId;
    /**
     * 수정일시
     */
    private String updtDt;
    /**
     * 수정아이디
     */
    private String updtId;

    public boolean hasPk() {
        return userSeq != null && seq != null;
    }

}