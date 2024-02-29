<%@page import="java.beans.Encoder"%>
<%@ page import="java.net.*,java.io.*" %>

<%!
String[] serverUrls = {
  "http://192.168.0.9:8080/",
};
%>
<%

try {
  String reqUrl = request.getQueryString();
  //String datas = request.getParameter("geometry");
  //System.out.println("datas" + datas);
  
  //System.out.println("reqUrl = " + reqUrl);
  boolean allowed = false;
  String token = null;
  for(String surl : serverUrls) {
    String[] stokens = surl.split("\\s*,\\s*");
    if(reqUrl.toLowerCase().contains(stokens[0].toLowerCase())) {
      allowed = true;
      if(stokens.length >= 2 && stokens[1].length() > 0)
        token = stokens[1];
      break;
    }
  }
allowed = true;
  if(!allowed) {
    response.setStatus(403);
    return;
  }
  if(token != null) {
    reqUrl = reqUrl + (reqUrl.indexOf("?") > -1 ? "&" : "?") + "token=" + token;
  }
  //System.out.println("reqUrl = " + reqUrl);
  //String b = "http://imap.incheon.go.kr%2Farcgis28%2Frest%2F";
  //reqUrl = b;
	//System.out.println(b);
	
	//reqUrl = URLEncoder.encode(reqUrl,"UTF-8");
	//reqUrl = reqUrl.replaceAll();
    URL url = new URL(reqUrl);
	HttpURLConnection con = (HttpURLConnection)url.openConnection();
	con.setDoOutput(true);
	con.setRequestMethod(request.getMethod());
	//System.out.println(request.getContentType());
	//con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	//con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	//con.setRequestProperty("Accept-Language", "ko-KR");
	//application/x-www-form-urlencoded
	
	if(request.getContentType() != null) {
		//System.out.println(request.getContentType());
	  con.setRequestProperty("Content-Type", request.getContentType());
    }
	con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	con.setRequestProperty("Referer", request.getHeader("Referer"));
	con.setRequestProperty("Accept", "*/*");
	
	int clength = request.getContentLength();
	if(clength > 0) {
		con.setDoInput(true);
		InputStream istream = request.getInputStream();
		OutputStream os = con.getOutputStream();
		final int length = 5000;
	  byte[] bytes = new byte[length];
	  int bytesRead = 0;
	  while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
	    os.write(bytes, 0, bytesRead);
	  }
	}else {
		//System.out.println("GET으로 변경");
	    con.setRequestMethod("GET");
	  }
	out.clear();
    out = pageContext.pushBody();
    
	OutputStream ostream = response.getOutputStream();
	response.setContentType(con.getContentType());

	InputStream in = con.getInputStream(); // <=====
	final int length = 5000;
  byte[] bytes = new byte[length];
  int bytesRead = 0;
  while ((bytesRead = in.read(bytes, 0, length)) > 0) {
    ostream.write(bytes, 0, bytesRead);
  }
  
} catch(Exception e) {
	System.out.println("e = " + e.getMessage());
	response.setStatus(500);
}

%>
