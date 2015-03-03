var ChromeBookMarkHandler = new function () {


    // returns new folder object on callback
    var createFolder = function (_folderId, _folderName, callback) {
        chrome.bookmarks.create({
            'parentId': _folderId,
            'title': _folderName
        }, callback);

    }

    var createBookMark = function (_folderId, _title, _url) {
        chrome.bookmarks.create({
            'parentId': _folderId,
            'title': _title,
            'url': _url
        });
    }

    var searchByName = function (_name, callback) {
        chrome.bookmarks.search(_name, callback);
    }

    var getOrCreateFolderinChildren = function (_folderId, _name, callback) {
        chrome.bookmarks.getChildren(_folderId, function (_nodeArr) {


            if (_nodeArr && _nodeArr.length > 0) {
                for (var i = 0; i < _nodeArr.length; i++) {
                    if (_nodeArr[i].title == _name) {
                        callback(null);
                        return;
                    }

                }
            }

            // not found create folder
            createFolder(_folderId, _name, callback)

        });
    }


    return {
        createFolder: createFolder,
        createBookMark: createBookMark,
        searchByName: searchByName,
        getOrCreateFolderinChildren: getOrCreateFolderinChildren
    }
}