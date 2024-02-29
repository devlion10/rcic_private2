package kr.or.lx.rcic.frmwrk.filter;

import org.sitemesh.builder.SiteMeshFilterBuilder;
import org.sitemesh.config.ConfigurableSiteMeshFilter;

public class SiteMeshFilter extends ConfigurableSiteMeshFilter {

    @Override
    protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {

        builder.addDecoratorPath("/admin/*", "/WEB-INF/layout/admin/default.jsp");

        builder.addExcludedPath("/admin/login");
        builder.addExcludedPath("/admin/login/*");
        builder.addExcludedPath("/admin/logout");
        builder.addExcludedPath("/admin/logout/*");
        builder.addExcludedPath("/admin/modal/*");
        builder.addExcludedPath("/admin/*/modal/*");
        builder.addExcludedPath("/admin/api/*");
        builder.addExcludedPath("/assets/*");
        builder.addExcludedPath("*.html");
        builder.addExcludedPath("*.jsp");
    }
}
