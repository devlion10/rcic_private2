package kr.or.lx.rcic.modules.api.entity;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
public class ApiRequest {

    // required
    private String apiKey;
    private String startYmd;
    private String endYmd;
    private Integer curPage;

    // optional
    private Integer cntPerPage = 10;
    private String sidoCd;
    private String sigunguCd;
    private String workType;
    private String facilType;

    public boolean required() {
        return StringUtils.isNotEmpty(apiKey)
                && StringUtils.isNotEmpty(startYmd)
                && StringUtils.isNotEmpty(endYmd)
                && curPage != null;
    }
}
