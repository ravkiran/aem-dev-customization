(function (document, $) {
    $(document).on("foundation-contentloaded", function (e) {
        $("coral-masonry-item.foundation-collection-item").each(function (i) {
            var $this = $(this);
            var collectionId = $this.data("foundationCollectionItemId");
            if (collectionId.indexOf("/content/dam/geometrixx-media") != -1) {
                var name = collectionId.substr(collectionId.lastIndexOf("/") + 1);
                $this.find("coral-card-title").text(name);
            }
        });
    });
})(document, Granite.$);