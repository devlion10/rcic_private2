<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Dashboard">
    <meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">

    <title>RCIC 관리자 <sitemesh:write property='title'/></title>

    <%@ include file="common/styles.jsp" %>
    <sitemesh:write property='head'/>
</head>
<body>

    <sitemesh:write property='body'/>

    <%@ include file="common/scripts.jsp" %>
    <%= (request.getAttribute("scripts-tags") != null) ?  request.getAttribute("scripts-tags") : "" %>
    <%= (request.getAttribute("scripts") != null) ?  request.getAttribute("scripts") : "" %>

</body>
</html>
