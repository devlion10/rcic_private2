package kr.or.lx.rcic.modules.api.entity;

import lombok.Data;

import java.util.List;

@Data
public class CodeResponse extends ApiResponseBase {

    List<Item> items;

    @Data
    public static class Item {
        private String codeType;
        private String code;
        private String codeNm;
    }
}
