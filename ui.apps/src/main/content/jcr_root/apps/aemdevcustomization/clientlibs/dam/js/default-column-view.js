(function (document, $) {
    $(document).on("foundation-contentloaded", function(e){
        var cookieConfig = $("body").data("shellCollectionpageViewCookie");
        var currentView = $.cookie(cookieConfig.name);
        if (currentView != "column") {
            //force column view
            $.cookie(cookieConfig.name, "column", cookieConfig);
            window.location.reload();
        }
    });
})(document, Granite.$);