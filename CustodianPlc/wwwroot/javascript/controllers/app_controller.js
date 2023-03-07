
function AppController () {

  this.swalError = function (title, message) {
    title = LibCore.isString(title) ? title : '';
    message = LibCore.isString(message) ? message : '';
    return swal({
      type: 'error',
      title: title,
      text: message
    });
  }

  this.swalSuccess = function (title, message) {
    title = LibCore.isString(title) ? title : '';
    message = LibCore.isString(message) ? message : '';
    return swal({
      type: 'success',
      title: title,
      text: message
    });
  }

  this.sendTemplateMail = function (parameters, data, callback) {
    var request = {
      parameters: parameters,
      data: data
    };
    var url = LibBrowser.route('send-template-mail');
    if (!LibCore.isString(url)) return;
    
    LibApi.post(url, request, function (status, response) {
      callback(status);
    });
  }

  this.saveGeneratedPdf = function (parameters, data, callback) {
    var request = {
      parameters: parameters,
      data: data
    };
    var url = LibBrowser.route('save-generated-pdf');
    if (!LibCore.isString(url)) return;
    
    LibApi.post(url, request, function (status, response) {
      if (status) filepath = response.filepath;
      else filepath = null;
      callback(filepath);
    });
  }

  this.downloadPdf = function (parameters, data, callback) {
    var self = this;
    self.saveGeneratedPdf(parameters, data, function (fullpath) {
      if (fullpath === null) return callback(false);
      else {
        var downloadUrl = LibBrowser.route('download-pdf');
        if (!LibCore.isString(downloadUrl)) return callback(false);
        downloadUrl = downloadUrl.replace(':path', fullpath)
        window.open(downloadUrl);
        callback(true);
      }
    });
  }
  
}

AppCtrl = new AppController();