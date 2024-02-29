package kr.or.lx.rcic.modules.shpimport.entity;

import lombok.Data;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 명칭사전 업로드
 */
@Data
public class DicUpload {

    private Long   seq;
    private String dicNm;
    private String dicTblNm;
    private String stdrDt;
    private Long   crtCnt;
    private String registDt;
    private String registId;

    private List<MultipartFile> shpFiles;

    public boolean hasShpFile() {
        if (CollectionUtils.isEmpty(shpFiles)) return false;

        for (MultipartFile mf : shpFiles) {
            if ("shp".equalsIgnoreCase(FilenameUtils.getExtension(mf.getOriginalFilename()))) return true;
        }
        return false;
    }

    
}
