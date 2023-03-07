/** 
 * 
 * @description To handle file validation or manipulations
 * 
 * 
 * @param {fileDomId}
 * @param {onChange Callback}
 * 
 * @returns {null}
 * 
*/

function LIB_FILE (fileDomId, onChange) {

  var file = null;
  var fileElement = $(`#${fileDomId}`);

  /**
   * @description A private function to get the file object form Dom
   * 
   * @param {null}
   * 
   * @returns {FileObject | null}
   * 
  */

  var getFile = function () {
    var file = fileElement.prop('files');
    if (LibCore.isObject(file) && file.length > 0) return file[0];
    return null;
  }

  /**
   * @description A private function to split file type into an array
   * 
   * @param {null}
   * 
   * @returns {FileObject | null}
   * 
  */

  var splitType = function () {
    if (!file) return null;
    var typeSplit = file.type.split('/');
    return LibCore.isArray(typeSplit) && typeSplit.length > 0 ? typeSplit : null;
  }

  /**
   * @description A method that returns the current selected file
   * 
   * @param {null}
   * 
   * @returns {FileObject | null}
   * 
  */

  this.get = function () {
    return file;
  }

  /**
   * @description A method to return the size of the file
   * 
   * @param {null}
   * 
   * @returns {Integer | null}
   * 
  */

  this.getSize = function () {
    return file && LibCore.isInteger(file.size) ? file.size : null;
  }

  /**
   * @description A method to return the size of the file
   * 
   * @param {null}
   * 
   * @returns {Integer | null}
   * 
  */

  this.getExt = function () {
    var typeSplit = splitType();
    return typeSplit === null ? null : typeSplit[typeSplit.length - 1].toLowerCase();
  }

  /**
   * @description A method to return the type of the file
   * 
   * @param {null}
   * 
   * @returns {Integer | null}
   * 
  */

  this.getType = function () {
    return file && LibCore.isStirng(file.type) ? file.type : null;
  }

  /**
   * @description A method that that checks if file is a jpeg image
   * 
   * @param {null}
   * 
   * @returns {Boolean}
   * 
  */
  
  this.isJPG = function () {
    var self = this;
    var ext = self.getExt();
    return ext === 'jpg' || ext === 'jpeg';
  }

  /**
   * @description A method that that checks if file is a png image
   * 
   * @param {null}
   * 
   * @returns {Boolean}
   * 
  */

  this.isPNG = function () {
    var self = this;
    return self.getExt() === 'png';
  }

  /**
   * @description A method that that checks if file is a pdf document
   * 
   * @param {null}
   * 
   * @returns {Boolean}
   * 
  */

  this.isPDF = function () {
    var self = this;
    return self.getExt() === 'pdf';
  }

  /**
   * @description Initializio=ng the object
   * 
   * @param {null}
   * 
   * @returns {null}
   * 
  */

  var self = this;
  $(document).ready(function () {
    file = getFile();
    fileElement.on('change', function () {
      file = getFile();
      if (typeof onChange === 'function') onChange(self);
    });
  });
  
}
