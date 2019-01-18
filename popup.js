function search_web(){
    var query = document.getElementById('query').value
    var num_tabs = parseInt(document.getElementById('numtabs').value)
    var ajaxGet = function (url, callback) {
    var callback = (typeof callback == 'function' ? callback : false), xhr = null;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    if (!xhr)
           return null;
    xhr.open("GET", url,true);
    xhr.onreadystatechange=function() {
      if (xhr.readyState==4 && callback) {
        callback(xhr.responseText)
      }
    }
    xhr.send(null);
    return xhr;
  }
  var link = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAEvaMlOXZBKULkKg2_hDxAHZrpCVieAtw&cx=009985590942163865830:rsec4lf7raa&q=' + query;
  ajaxGet(
    link,
    function (response) {
        response = JSON.parse(response);
        if (!response)
            return;
        for (var i=0; i<num_tabs; i++){
          setTimeout(chrome.tabs.create({
            "active":false, url: response.items[i].link,
            }), 500);
        }
  });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('search').addEventListener('click', search_web);
});
