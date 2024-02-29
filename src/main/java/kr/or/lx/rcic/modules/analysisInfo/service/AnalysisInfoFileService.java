package kr.or.lx.rcic.modules.analysisInfo.service;

import java.io.File;
import java.util.Map;

public interface AnalysisInfoFileService {

    File generateExcel(Map param, String filePath, String fileName) throws Exception;
}
