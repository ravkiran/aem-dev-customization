<%--
     overlaid /apps/cq/gui/components/projects/admin/datasource/projectsdatasource for sorting the projects by creation date (latest projects first)
--%>     
<%--
ADOBE CONFIDENTIAL

Copyright 2013 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains
the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained
herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents,
patents in process, and are protected by trade secret or copyright law.
Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained
from Adobe Systems Incorporated.
--%><%
%><%@page session="false"
          import="com.adobe.cq.projects.api.ProjectManager,
              com.adobe.granite.ui.components.Config,
              com.adobe.granite.ui.components.ExpressionHelper,
              com.adobe.granite.ui.components.ds.DataSource,
              com.adobe.granite.ui.components.ds.SimpleDataSource,
              org.apache.commons.lang.StringUtils,
			  java.util.Map,
			  java.util.HashMap,
              org.apache.sling.api.resource.Resource,
			  com.day.cq.search.Query,
              com.day.cq.search.QueryBuilder,
              com.day.cq.search.PredicateGroup,
              com.day.cq.search.result.SearchResult,
              javax.jcr.Session,
              java.util.Iterator" %><%
%><%@include file="/libs/granite/ui/global.jsp"%><%
    ExpressionHelper ex  = cmp.getExpressionHelper();
    Config dsCfg         = new Config(resource.getChild(Config.DATASOURCE));
    String parentPath    = ex.getString(dsCfg.get("path", String.class));
    Integer offset       = ex.get(dsCfg.get("offset", String.class), Integer.class);
    Integer limit        = ex.get(dsCfg.get("limit", String.class), Integer.class);

    if (offset == null) {
        offset = 0;
    }

    limit = (limit == null) ? -1 : limit + 1;

    ProjectManager pm = resourceResolver.adaptTo(ProjectManager.class);
    String active = request.getParameter("active");

    Map<String, String> map = new HashMap<String, String>();
	map.put("path", "/content/projects");
    map.put("type", "nt:unstructured");
    map.put("1_property","jcr:content/active");
 	map.put("1_property.value",active);
	map.put("2_property","sling:resourceType");
	map.put("2_property.value","cq/gui/components/projects/admin/card/projectcard");
    map.put("orderby","@jcr:created");
    map.put("orderby.sort","desc");
    map.put("p.offset", offset.toString());
    map.put("p.limit", limit.toString());

	QueryBuilder builder = resourceResolver.adaptTo(QueryBuilder.class);
	Query query = builder.createQuery(PredicateGroup.create(map), resourceResolver.adaptTo(Session.class));

    SearchResult queryResult = query.getResult();

	Iterator<Resource> resourceIterator = queryResult.getResources();

    DataSource ds = new SimpleDataSource(resourceIterator);
    request.setAttribute(DataSource.class.getName(), ds);
%>
