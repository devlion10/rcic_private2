package kr.or.lx.rcic.frmwrk.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FileForm {
	private List<MultipartFile> files;
	private String upDir;

	public List<MultipartFile> getFiles() {
		return files;
	}

	public String getUpDir() {
		return upDir;
	}

	public void setUpDir(String upDir) {
		this.upDir = upDir;
	}

	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
	
}
