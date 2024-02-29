<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Dashboard">
    <meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">

    <!-- Bootstrap core CSS -->
    <link href="/assets/admin/css/bootstrap.css" rel="stylesheet">
    <!--external css-->
    <link href="/assets/admin/font-awesome/css/font-awesome.css" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="/assets/admin/css/style.css" rel="stylesheet">
    <link href="/assets/admin/css/style-responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/admin/css/bootstrap-datetimepicker.min.css">

    <title>RCIC Admin :: <sitemesh:write property='title'/></title>

    <%@ include file="common/styles.jsp" %>
    <%@ include file="common/scripts.jsp" %>
    <sitemesh:write property='head'/>
</head>
<body>

<section id="container" >
    <%@include file="common/header.jsp"%>
    <%@include file="common/lnb.jsp"%>

    <!--main content start-->
    <section id="main-content">
        <sitemesh:write property='body'/>
    </section>
    <!--main content end-->
</section>

<%= (request.getAttribute("scripts-tags") != null) ?  request.getAttribute("scripts-tags") : "" %>
<%= (request.getAttribute("scripts") != null) ?  request.getAttribute("scripts") : "" %>

</body>
</html>
