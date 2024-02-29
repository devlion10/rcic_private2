//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package kr.or.lx.rcic.modules.contract.entity;

public class Contract {
    private String rgstDt;
    private String cntrctCnclsDate;
    private String corpList;
    private String totcntrctAmt;
    private String cbgnDate;
    private String ttalccmpltDate;
    private String startDt;
    private String endDt;
    private String keyword;
    private String getDataCnt;
    private String converterDataCnt;
    private String stdrDt;
    private String searchStartDt;
    private String searchEndDt;
    private String anaysisCnt;

    public String getRgstDt() {
        return this.rgstDt;
    }

    public String getCntrctCnclsDate() {
        return this.cntrctCnclsDate;
    }

    public String getCorpList() {
        return this.corpList;
    }

    public String getTotcntrctAmt() {
        return this.totcntrctAmt;
    }

    public String getCbgnDate() {
        return this.cbgnDate;
    }

    public String getTtalccmpltDate() {
        return this.ttalccmpltDate;
    }

    public String getStartDt() {
        return this.startDt;
    }

    public String getEndDt() {
        return this.endDt;
    }

    public String getKeyword() {
        return this.keyword;
    }

    public String getGetDataCnt() {
        return this.getDataCnt;
    }

    public String getConverterDataCnt() {
        return this.converterDataCnt;
    }

    public String getStdrDt() {
        return this.stdrDt;
    }

    public String getSearchStartDt() {
        return this.searchStartDt;
    }

    public String getSearchEndDt() {
        return this.searchEndDt;
    }

    public String getAnaysisCnt() {
        return this.anaysisCnt;
    }

    public void setRgstDt(String rgstDt) {
        this.rgstDt = rgstDt;
    }

    public void setCntrctCnclsDate(String cntrctCnclsDate) {
        this.cntrctCnclsDate = cntrctCnclsDate;
    }

    public void setCorpList(String corpList) {
        this.corpList = corpList;
    }

    public void setTotcntrctAmt(String totcntrctAmt) {
        this.totcntrctAmt = totcntrctAmt;
    }

    public void setCbgnDate(String cbgnDate) {
        this.cbgnDate = cbgnDate;
    }

    public void setTtalccmpltDate(String ttalccmpltDate) {
        this.ttalccmpltDate = ttalccmpltDate;
    }

    public void setStartDt(String startDt) {
        this.startDt = startDt;
    }

    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public void setGetDataCnt(String getDataCnt) {
        this.getDataCnt = getDataCnt;
    }

    public void setConverterDataCnt(String converterDataCnt) {
        this.converterDataCnt = converterDataCnt;
    }

    public void setStdrDt(String stdrDt) {
        this.stdrDt = stdrDt;
    }

    public void setSearchStartDt(String searchStartDt) {
        this.searchStartDt = searchStartDt;
    }

    public void setSearchEndDt(String searchEndDt) {
        this.searchEndDt = searchEndDt;
    }

    public void setAnaysisCnt(String anaysisCnt) {
        this.anaysisCnt = anaysisCnt;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof Contract)) {
            return false;
        } else {
            Contract other = (Contract)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label191: {
                    Object this$rgstDt = this.getRgstDt();
                    Object other$rgstDt = other.getRgstDt();
                    if (this$rgstDt == null) {
                        if (other$rgstDt == null) {
                            break label191;
                        }
                    } else if (this$rgstDt.equals(other$rgstDt)) {
                        break label191;
                    }

                    return false;
                }

                Object this$cntrctCnclsDate = this.getCntrctCnclsDate();
                Object other$cntrctCnclsDate = other.getCntrctCnclsDate();
                if (this$cntrctCnclsDate == null) {
                    if (other$cntrctCnclsDate != null) {
                        return false;
                    }
                } else if (!this$cntrctCnclsDate.equals(other$cntrctCnclsDate)) {
                    return false;
                }

                Object this$corpList = this.getCorpList();
                Object other$corpList = other.getCorpList();
                if (this$corpList == null) {
                    if (other$corpList != null) {
                        return false;
                    }
                } else if (!this$corpList.equals(other$corpList)) {
                    return false;
                }

                label170: {
                    Object this$totcntrctAmt = this.getTotcntrctAmt();
                    Object other$totcntrctAmt = other.getTotcntrctAmt();
                    if (this$totcntrctAmt == null) {
                        if (other$totcntrctAmt == null) {
                            break label170;
                        }
                    } else if (this$totcntrctAmt.equals(other$totcntrctAmt)) {
                        break label170;
                    }

                    return false;
                }

                label163: {
                    Object this$cbgnDate = this.getCbgnDate();
                    Object other$cbgnDate = other.getCbgnDate();
                    if (this$cbgnDate == null) {
                        if (other$cbgnDate == null) {
                            break label163;
                        }
                    } else if (this$cbgnDate.equals(other$cbgnDate)) {
                        break label163;
                    }

                    return false;
                }

                Object this$ttalccmpltDate = this.getTtalccmpltDate();
                Object other$ttalccmpltDate = other.getTtalccmpltDate();
                if (this$ttalccmpltDate == null) {
                    if (other$ttalccmpltDate != null) {
                        return false;
                    }
                } else if (!this$ttalccmpltDate.equals(other$ttalccmpltDate)) {
                    return false;
                }

                Object this$startDt = this.getStartDt();
                Object other$startDt = other.getStartDt();
                if (this$startDt == null) {
                    if (other$startDt != null) {
                        return false;
                    }
                } else if (!this$startDt.equals(other$startDt)) {
                    return false;
                }

                label142: {
                    Object this$endDt = this.getEndDt();
                    Object other$endDt = other.getEndDt();
                    if (this$endDt == null) {
                        if (other$endDt == null) {
                            break label142;
                        }
                    } else if (this$endDt.equals(other$endDt)) {
                        break label142;
                    }

                    return false;
                }

                label135: {
                    Object this$keyword = this.getKeyword();
                    Object other$keyword = other.getKeyword();
                    if (this$keyword == null) {
                        if (other$keyword == null) {
                            break label135;
                        }
                    } else if (this$keyword.equals(other$keyword)) {
                        break label135;
                    }

                    return false;
                }

                Object this$getDataCnt = this.getGetDataCnt();
                Object other$getDataCnt = other.getGetDataCnt();
                if (this$getDataCnt == null) {
                    if (other$getDataCnt != null) {
                        return false;
                    }
                } else if (!this$getDataCnt.equals(other$getDataCnt)) {
                    return false;
                }

                label121: {
                    Object this$converterDataCnt = this.getConverterDataCnt();
                    Object other$converterDataCnt = other.getConverterDataCnt();
                    if (this$converterDataCnt == null) {
                        if (other$converterDataCnt == null) {
                            break label121;
                        }
                    } else if (this$converterDataCnt.equals(other$converterDataCnt)) {
                        break label121;
                    }

                    return false;
                }

                Object this$stdrDt = this.getStdrDt();
                Object other$stdrDt = other.getStdrDt();
                if (this$stdrDt == null) {
                    if (other$stdrDt != null) {
                        return false;
                    }
                } else if (!this$stdrDt.equals(other$stdrDt)) {
                    return false;
                }

                label107: {
                    Object this$searchStartDt = this.getSearchStartDt();
                    Object other$searchStartDt = other.getSearchStartDt();
                    if (this$searchStartDt == null) {
                        if (other$searchStartDt == null) {
                            break label107;
                        }
                    } else if (this$searchStartDt.equals(other$searchStartDt)) {
                        break label107;
                    }

                    return false;
                }

                Object this$searchEndDt = this.getSearchEndDt();
                Object other$searchEndDt = other.getSearchEndDt();
                if (this$searchEndDt == null) {
                    if (other$searchEndDt != null) {
                        return false;
                    }
                } else if (!this$searchEndDt.equals(other$searchEndDt)) {
                    return false;
                }

                Object this$anaysisCnt = this.getAnaysisCnt();
                Object other$anaysisCnt = other.getAnaysisCnt();
                if (this$anaysisCnt == null) {
                    if (other$anaysisCnt != null) {
                        return false;
                    }
                } else if (!this$anaysisCnt.equals(other$anaysisCnt)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof Contract;
    }

    public int hashCode() {
        int PRIME = 1;
        int result = 1;
        Object $rgstDt = this.getRgstDt();
        result = result * 59 + ($rgstDt == null ? 43 : $rgstDt.hashCode());
        Object $cntrctCnclsDate = this.getCntrctCnclsDate();
        result = result * 59 + ($cntrctCnclsDate == null ? 43 : $cntrctCnclsDate.hashCode());
        Object $corpList = this.getCorpList();
        result = result * 59 + ($corpList == null ? 43 : $corpList.hashCode());
        Object $totcntrctAmt = this.getTotcntrctAmt();
        result = result * 59 + ($totcntrctAmt == null ? 43 : $totcntrctAmt.hashCode());
        Object $cbgnDate = this.getCbgnDate();
        result = result * 59 + ($cbgnDate == null ? 43 : $cbgnDate.hashCode());
        Object $ttalccmpltDate = this.getTtalccmpltDate();
        result = result * 59 + ($ttalccmpltDate == null ? 43 : $ttalccmpltDate.hashCode());
        Object $startDt = this.getStartDt();
        result = result * 59 + ($startDt == null ? 43 : $startDt.hashCode());
        Object $endDt = this.getEndDt();
        result = result * 59 + ($endDt == null ? 43 : $endDt.hashCode());
        Object $keyword = this.getKeyword();
        result = result * 59 + ($keyword == null ? 43 : $keyword.hashCode());
        Object $getDataCnt = this.getGetDataCnt();
        result = result * 59 + ($getDataCnt == null ? 43 : $getDataCnt.hashCode());
        Object $converterDataCnt = this.getConverterDataCnt();
        result = result * 59 + ($converterDataCnt == null ? 43 : $converterDataCnt.hashCode());
        Object $stdrDt = this.getStdrDt();
        result = result * 59 + ($stdrDt == null ? 43 : $stdrDt.hashCode());
        Object $searchStartDt = this.getSearchStartDt();
        result = result * 59 + ($searchStartDt == null ? 43 : $searchStartDt.hashCode());
        Object $searchEndDt = this.getSearchEndDt();
        result = result * 59 + ($searchEndDt == null ? 43 : $searchEndDt.hashCode());
        Object $anaysisCnt = this.getAnaysisCnt();
        result = result * 59 + ($anaysisCnt == null ? 43 : $anaysisCnt.hashCode());
        return result;
    }

    public String toString() {
        return "Contract(rgstDt=" + this.getRgstDt() + ", cntrctCnclsDate=" + this.getCntrctCnclsDate() + ", corpList=" + this.getCorpList() + ", totcntrctAmt=" + this.getTotcntrctAmt() + ", cbgnDate=" + this.getCbgnDate() + ", ttalccmpltDate=" + this.getTtalccmpltDate() + ", startDt=" + this.getStartDt() + ", endDt=" + this.getEndDt() + ", keyword=" + this.getKeyword() + ", getDataCnt=" + this.getGetDataCnt() + ", converterDataCnt=" + this.getConverterDataCnt() + ", stdrDt=" + this.getStdrDt() + ", searchStartDt=" + this.getSearchStartDt() + ", searchEndDt=" + this.getSearchEndDt() + ", anaysisCnt=" + this.getAnaysisCnt() + ")";
    }

    public Contract() {
    }
}
