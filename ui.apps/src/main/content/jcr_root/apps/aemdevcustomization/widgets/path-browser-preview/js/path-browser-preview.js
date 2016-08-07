(function (document, $) {
    var rel_preview_enabled_path_browser = "[data-enable-path-browser-preview='true'] .js-coral-pathbrowser-button";
    var rel_path_browser_item = ".coral-Pathbrowser-picker[data-enable-path-browser-preview=\"true\"] .coral-ColumnView-item";
    var rel_path_browser_preview = ".path-browser-preview";
    var rel_path_browser_preview_image = rel_path_browser_preview + " .path-browser-preview-image";
    var rel_active_item = ".coral-ColumnView-column.is-active .coral-ColumnView-item.is-active";
    var previewUrl;
    $(document).on("click", rel_preview_enabled_path_browser, function (e) {
        var target = $(e.target);
        var pathBrowser = target.closest("[data-enable-path-browser-preview='true']");
        previewUrl = pathBrowser.data("previewUrl") || "$path.thumb.319.319.png";
        if (pathBrowser.length) {
            var $pathBrowser = pathBrowser.data("pathBrowser");
            var $pathBrowserPicker = $pathBrowser.$picker;
            $pathBrowserPicker.attr("data-enable-path-browser-preview", "true");
            var $pickerPanel = $pathBrowserPicker.find(".coral-Pathbrowser-pickerPanel");
            var $pickerColumnView = $pickerPanel.find(".coral-ColumnView");
            $pickerColumnView.css({
                width: "75%"
            });
            var $preview = $("<div class='" + rel_path_browser_preview.substr(1) + "'><div class='path-browser-preview-text'>Preview</div><div class='path-browser-preview-image'></div></div>");
            $preview.css({
                width: "25%",
                height: "100%",
                "border-left": "1px solid black",
                float: "right"
            });
            $pickerPanel.append($preview);
        }
    });
    $(document).on("click", rel_path_browser_item, function (e) {
        var activeItem = $(rel_active_item);
        var path = activeItem.data('value');
        var previewImage = $(rel_path_browser_preview_image);
        previewImage.find("img").remove();
        if (path) {
            var previewThumbnail = previewUrl.replace("$path", path);
            previewImage.append("<img src='" + previewThumbnail + "'>");
        }
    });
})(document, Granite.$);