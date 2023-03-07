
function LibBrowser () {

  this.redirect = function (path) {
    if (!LibCore.
      (path) || path.trim().length <= 0) return;
    window.location = path;
  }

  this.route = function (route) {
    var routeElement = $(`input[route-name='${route}']`);
    if (
      routeElement.length !== 1
      || !LibCore.isString(routeElement.val())
      || routeElement.val().trim().length <= 0
    ) return null;
    return routeElement.val().trim();
  }

}

LibBrowser = new LibBrowser();