/** 
 * @description Declare a specific way the ajax calls are made
 * 
 * @param {None}
 * 
 * @type {Class}
 * 
*/

function LIB_API () {

  /** 
   * @description To setup Ajax
   * 
   * @param {None}
   * 
   * @return {None}
   * 
  */

  var setup = function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  }

  /** 
   * @description The fixed structure for ajax calls
   * 
   * @param {url} - Route to connect to an endpoint
   * @param {type} - Http verb to use
   * @param {data} - Data to send to the backend
   * @param {callback} - an handler for the response or error 
   * 
   * @return {None}
   * 
  */

  this.call = function(url, type, data, callback) {
    setup();
    $.ajax({
      url: url,
      type: type,
      data: data,
      success: function (response) {
        callback(true, response);
      },
      error: function (error) {
        callback(false, error);
      }
    });
  }

  this.post = function(url, data, callback) {
    setup();
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function (response) {
        // console.log(response);
        callback(true, response);
      },
      error: function (error) {
        // console.log(error);
        callback(false, error);
      }
    });
  }

  this.get = function(url, callback) {
    setup();
    $.ajax({
      url: url,
      type: 'GET',
      success: function (response) {
        callback(true, response);
      },
      error: function (error) {
        callback(false, error);
      }
    });
  }

}

LibApi = new LIB_API();