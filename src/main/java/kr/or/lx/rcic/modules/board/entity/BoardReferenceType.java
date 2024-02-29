package kr.or.lx.rcic.modules.board.entity;

public enum BoardReferenceType {

    NOTICE("1"),
    FAQ("2"),
    QNA("3");

    private String code;

    BoardReferenceType(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
