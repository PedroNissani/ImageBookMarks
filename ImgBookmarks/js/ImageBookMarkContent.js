var ImageBookMarkContent = new function () {

    var init = function ()
    {
        /* Listen for messages */
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            if (msg.command && (msg.command == ImageBookMark_config.GET_IMAGES_COMMAND)) {
                

                var imgArr = $('img').
                    filter(function () {
                        return ($(this).width() > ImageBookMark_config.MAX_WIDTH) && ($(this).height() > ImageBookMark_config.MAX_HEIGHT)
                    }).
                    map(function () { return this.src; }).
                    slice(0, ImageBookMark_config.MAX_IMAGES).get();

                sendResponse(imgArr);
            }
        });
    }

    return {
        init: init
    }
}

$(document).ready(function ($) {

    ImageBookMarkContent.init();

});