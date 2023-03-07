
function LifeProductsIndexController () {

  this.loadPaymentFrequency = function (productCode, targetId, callback) {
    var self = this;
    var route = Browser.route('life.frequencies');
    if (!route) return;
    route = route.replace(':productCode', productCode);
    LibApi.get(route, function (status, response) {
      if (!LibCore.isArray(response)) callback();
      var frequencies = [];
      response.forEach(function (item) {
        if (
          LibCore.isObject(item)
          && 'freqDesc' in item
          && 'freqCode' in item
        ) frequencies.push(item);
      });
      
      var html = '<option value="">Select</option>';
      frequencies.forEach(function(frequency){
        html += `<option value='${frequency.freqCode}'>${frequency.freqDesc}</option>`;
      });
      $(`#${targetId}`).html(html);
      callback();
    });
  }

  this.loadPolicyTerms = function (targetId, productCode, clientCode, callback) {
    var self = this;
    var route = Browser.route('life.terms');
    if (!route) return;

    route = route.replace(':productCode', productCode);
    route = route.replace(':clientCode', clientCode);
    $(`#${targetId}`).html('<option value="">Select</option>');
    
    LibApi.get(route, function (status, response) {
      if (!LibCore.isArray(response)) return callback();
      var terms = [];
      response.forEach(function (item) {
        if (LibCore.isInteger(item)) terms.push(item);
      });

      var html = '<option value="">Select</option>';
      terms.forEach(function(term){
        html += `<option value='${term}'>${term}</option>`;
      });
      $(`#${targetId}`).html(html);
      callback();
    });
  }

  this.calculateQuote = function (data, callback) {
    var self = this;
    var route = Browser.route('life.calculate');
    if (!route) return;
    LibApi.post(route, data, function (status, result) {
      result = (
        !LibCore.isObject(result)
        || !('sumInsured' in result)
        || !('quoCode' in result)
        || result.sumInsured == null
        || result.quoCode == null
      ) ? null : result;
      callback(result);
    });
  }
  
  this.getClientCode = function (data, callback) {
    var self = this;
    var route = Browser.route('life.client.create');
    var clientCode = null;
    if (!route) callback(null);
    LibApi.post(route, data, function (status, response) {
      clientCode = !LibCore.isNumber(response) ? null : response;
      callback(clientCode);
    });
  }

}

LifeProductsIndexCtrl = new LifeProductsIndexController();