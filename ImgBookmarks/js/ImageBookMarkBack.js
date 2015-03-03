


var ImageBookMark = new function () {

    // Members
    var m_MainFolderId = null;

    /// Events ///////////


    // React when a browser action's icon is clicked.
    var onBrowserActionClick = function (tab) {

        console.log('url' + tab.url);

        // get page URL
        var url = tab.url;

        // check if alrady booked
        ChromeBookMarkHandler.getOrCreateFolderinChildren(m_MainFolderId, url, function (_folder) {


            if (_folder) {
                // get all images over 150x150
                chrome.tabs.sendMessage(tab.id, { command: ImageBookMark_config.GET_IMAGES_COMMAND },
                                function (_imagesArr) {

                                    // run all and create bookmarks
                                    if (_imagesArr && _imagesArr.length > 0) {
                                        for (var i = 0; i < _imagesArr.length; i++) {
                                            try {
                                                ChromeBookMarkHandler.createBookMark(_folder.id, _imagesArr[i], _imagesArr[i]);
                                            }
                                            catch (ex) {
                                                console.log(ex);
                                            }
                                        }
                                    }
                                });

            }
        });



    };


    // private

    //check if Main folder is set and create it
    var checkMainFolder = function () {
        var mainFoldername = ImageBookMark_config.MAIN_FOLDER_NAME;
        // check if Main folder is set:
        ChromeBookMarkHandler.searchByName(mainFoldername,
            function (_nodeArr) {
                if (_nodeArr && _nodeArr.length > 0) {
                    m_MainFolderId = _nodeArr[0].id;
                }
                else {
                    // create main folder
                    ChromeBookMarkHandler.createFolder(null, mainFoldername, function (_rootFolder) {
                        m_MainFolderId = _rootFolder.id;
                    });
                }
            });
    }

    // Public //////////////

    var init = function () {
        checkMainFolder();
        // add event listner for browser action 
        chrome.browserAction.onClicked.addListener(onBrowserActionClick);
    }


    return {
        init: init
    }



}


ImageBookMark.init();