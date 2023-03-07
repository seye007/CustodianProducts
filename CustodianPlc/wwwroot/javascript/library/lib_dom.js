/** 
 * @description A class to manage an instance of form
 * 
 * @param {LibCore | LibVal}
 * 
 * @returns {None}
 * 
 * 
*/

function LIB_DOM () {
  
  /*
  |--------------------------------------------------------------------------
  | Private Attributes
  |--------------------------------------------------------------------------
  |
  | 
  |
  */
 

  /*
  |--------------------------------------------------------------------------
  | Public Actions
  |--------------------------------------------------------------------------
  |
  | 
  |
  */


  /** 
   * 
   * @description To check if a field exists in dom
   * 
   * @param {elementId}
   * 
   * @returns {Boolean}
   * 
  */

  this.exists = function (elementId) {
    var count;

    if (!LibCore.isString(elementId)) return false;
    count = $(`#${elementId}`).length;
    return LibCore.isInteger(count) && count > 0;
  }

  /** 
   * 
   * @description To check if fields in a field list exists in dom
   * 
   * @param {elementIds}
   * 
   * @returns {Boolean}
   * 
  */

  this.existsMany = function (elementIds) {
    var i;
    var elementId;

    if (LibCore.isArray(elementIds)) {
      for (i=0; i<elementIds.length; i++) {
        elementId = elementIds[i];

        count = $(`#${elementId}`).length;
        if (!LibCore.isInteger(count) || count <= 0) {
          return false;
        }
      } return true;
    } return false;
  }

  /** 
   * 
   * @description To get the tag name of the element in question
   * 
   * @param {fieldId}
   * 
   * @returns {String | null}
   * 
  */

  this.tagname = function (elementId) {
    var self = this;
    var tagname;

    if (!self.exists(elementId)) return null;
    tagname = $(`#${elementId}`).prop('tagName');
    
    return LibCore.isString(tagname) ? tagname.toLowerCase() : null;
  }

  /** 
   * 
   * @description To get the value of an element
   * 
   * @param {elementId}
   * 
   * @returns {String}
   * 
  */

  this.get = function (elementId) {
    var self = this;
    var tagname, element;
    var value = null;

    tagname = self.tagname(elementId);
    if(tagname === null) return '';

    element = $(`#${elementId}`);

    switch (tagname) {
      case 'input':
      case 'textarea':
      case 'select': value = element.val(); break;
      case 'div': value = element.html(); break;
      case 'span': value = element.text(); break;
      default: break;
    }
    return LibCore.isString(value) ? value.trim() : '';
  }

  /** 
   * 
   * @description To get the value of an many element
   * 
   * @param {elementId}
   * 
   * @returns {String}
   * 
  */

  this.getMany = function (elementIds) {
    var self =this;
    var data = {};
    if (!LibCore.isArray(elementIds)) return data;
    
    elementIds.forEach(function (elementId) {
      data[elementId] = self.get(elementId);
    });
    return data;
  }

  /** 
   * 
   * @description To set the value of an element
   * 
   * @param {elementId}
   * 
   * @returns {Boolean}
   * 
  */

  this.set = function (elementId, value) {
    var self = this;
    var tagname, element;

    tagname = self.tagname(elementId);
    if(tagname === null) return false;

    element = $(`#${elementId}`);

    switch (tagname) {
      case 'input': 
      case 'select': element.val(value); break;
      case 'div': element.html(value); break;
      case 'span': element.text(value); break;
      default: break;
    }
    return true;
  }

  /** 
   * 
   * @description To apply a rule on an element value
   * 
   * @param {elementId}
   * @param {rule}
   * @param {error}
   * 
   * 
   * @returns {true | String} - String: Error message
   * 
  */

  this.apply = function (elementId, rule, error) {
    var self = this;
    var value;
    
    if (!self.exists(elementId)) return '';
    value = self.get(elementId);

    error = LibCore.isString(error) ? error : '';
    return LibVal.check(value, rule) === true ? true : error; 
  }
  
  /** 
   * 
   * @description To enable on keyup change on one element on another
   * 
   * @param {elementId}
   * @param {destElementId}
   * 
   * 
   * @returns {Boolean}
   * 
  */

  this.bindKeyUp = function (elementId, destElementId) {
    var self = this;
    var value;

    if (
      !self.exists(elementId)
      || !self.exists(destElementId)
    ) return false;

    //  On load initialization
    value = self.get(elementId);
    self.set(destElementId, value);

    // Keyup event
    $(`#${elementId}`).on('keyup', function () {
      value = self.get(elementId);
      self.set(destElementId, value);
    });
    return true;
  }

  this.validateForm = function (formId) {
    var self = this;
    var form;
    
    if (!self.exists(formId)) return false;
    form = $(`#${formId}`)[0];
    if(form && !form.checkValidity()) {
      form.reportValidity();
    }
  }

  this.maskPhoneNumberFields = function(phonefieldid) {
    phonefieldid.forEach(phoneid => {
      $(phoneid).mask("(099)99999999");
    });
  }

}

LibDom = new LIB_DOM();
