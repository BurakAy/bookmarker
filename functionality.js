//listen for submit

document.getElementById('submitform').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('sitename').value;
    var siteUrl = document.getElementById('siteurl').value;

    if (!siteName || !siteUrl) {
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // localStorage.setItem('test', 'hello');

    if (localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('submitForm').reset();

    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
};

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
};

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var theBookmarks = document.getElementById('bookmarks');

    theBookmarks.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var sitename = bookmarks[i].name;
        var siteurl = bookmarks[i].url;

        theBookmarks.innerHTML += '<div class="aSite"><h3>'+sitename+'</h3><a class="visit" href="'+siteurl+'" target="_blank">Visit</a><a onClick="deleteBookmark(\''+siteurl+'\')" class="delete" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>';
    }
    
};
