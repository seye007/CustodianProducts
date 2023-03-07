
function API () {

  this.emailQuote = function (route, data, callback) {
    var url = Browser.route(route);
    if (!url) return;
    LibApi.call(url, 'POST', data, function (status, response) {
      if (response === true) callback(true);
      else callback(false);
    });
  }

  this.saveQuote = function (route, data, callback) {
    var url = Browser.route(route);
    if (!url) return;
    LibApi.call(url, 'POST', data, function (status, response) {
      if (
        LibCore.
          (response)
        && response.trim().length > 0
      ) callback(response.trim());
      else callback(null);
    });
  }
  
}

Api = new API();