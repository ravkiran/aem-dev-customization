(function (document, $) {
    $(document).on("foundation-contentloaded", function (e) {
        var cookieConfig = $("body").data("shellCollectionpageViewCookie");
        var currentView = $.cookie(cookieConfig.name);
        var foundationContentPath = $(".foundation-content-path").data("foundationContentPath");
        if (currentView != "column" && foundationContentPath.indexOf("/content/dam/geometrixx") != -1) {
            //force column view
            $.cookie(cookieConfig.name, "column", cookieConfig);
            window.location.reload();
        }
    });
})(document, Granite.$);