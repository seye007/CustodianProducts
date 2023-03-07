/**
 * 
 * @description To handle core language related operations
 * @param {None}
 * 
*/

function LIB_CORE() {
  
  this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  this.digitsAsStr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  this.alphabets = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

  /*********************************************************/
  /** 
   * @description A list of methods for performing checks
   * 
   * @namespace {is* | in*}
   * 
   * @returns {Boolean}
   * 
  */
  /*********************************************************/

  this.isAlpha = function (argument) {
    var self = this;
    var itemIndex;
    var item;

    var result = self.explode(argument);
    if (result === null || result.length === 0) return false;

    for (itemIndex=0; itemIndex<result.length; itemIndex++) {
      item = result[itemIndex];
      if (!self.inArray(self.alphabets, item)) return false;
    }
    return true;

  }

  this.isObject = function (argument) {
    return argument !== null && typeof argument === 'object';
  }

  this.isPlain = function (argument) {
    var self = this;
    return (
      self.isString(argument)
      || typeof argument === 'number'
    );
  }

  this.isArray = function (argument) {
    return Array.isArray(argument);
  }

  this.isString = function (argument) {
    return typeof argument === 'string';
  }

  this.inArray = function (haystack, needle) {
    var self = this;
    var itemIndex, item;
    if (!self.isArray(haystack)) return false;
    for (itemIndex=0; itemIndex<haystack.length; itemIndex++) {
      item = haystack[itemIndex];
      if (item === needle) return true;
    }
    return false;
  }

  this.isFunction = function (argument) {
    return typeof argument === 'function';
  }

  /**********************************************************/
  /** 
   * @description
   * A list of methods for performing number related checks
   * 
   * @namespace {is*}
   * 
   * @returns {Boolean}
   * 
  */
  /***********************************************************/

  this.isInteger = function (argument, strict) {
    var self = this;

    strict = strict === true;
    if (strict && self.isString(argument)) return false;

    if (!self.isPlain(argument)) return false;
    argument = `${argument}`;
    if (argument.length === 0) return false; 

    var itemIndex, item;
    for (itemIndex=0; itemIndex<argument.length; itemIndex++) {
      item = argument[itemIndex];
      if (!self.inArray(self.digitsAsStr, item)) return false;
    }
    return true;
  }

  this.isFloat = function (argument, strict) {
    var self = this;

    strict = strict === true;
    if (strict && self.isString(argument)) return false;

    if (!self.isPlain(argument)) return false;
    argument = `${argument}`;
    if (argument.length === 0) return false;

    var numSplit = argument.split('.');
    if (
      numSplit.length !== 2
      || !self.isInteger(numSplit[0])
      || !self.isInteger(numSplit[1])
    ) return false;
    return true;
  }

  this.toNgCurrencyFormat = function (argument) {
    var self = this;
    if (!self.isNumber(argument)) return null;
    argument = parseFloat(argument);
    return argument.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  this.isNumber = function (argument, strict) {
    var self = this;
    return (
      self.isInteger(argument, strict)
      || self.isFloat(argument, strict)
    );
  }

  this.isIntegerArray = function (haystack, strict) {
    var self = this;
    if (!self.isArray(haystack)) return false;
    for (itemIndex in haystack) {
      item = haystack[itemIndex];
      if (!self.isInteger(item, strict)) return false;
    }
    return true;
  }

  this.isFloatArray = function (haystack, strict) {
    var self = this;
    if (!self.isArray(haystack)) return false;
    for (itemIndex in haystack) {
      item = haystack[itemIndex];
      if (!self.isFloat(item, strict)) return false;
    }
    return true;
  }

  this.isNumberArray = function (haystack, strict) {
    var self = this;
    if (!self.isArray(haystack)) return false;
    for (itemIndex in haystack) {
      item = haystack[itemIndex];
      if (!self.isNumber(item, strict)) return false;
    }
    return true;
  }

  /** 
   * @description
   * Used python range logic to generate range of numbers
   * Step can be ommitted and defaults to 1
   * End and Step can be ommitted at the same time to default to start and 1 respectively
   * 
   * @param {start}
   * @param {end} 
   * @param {step}
   * 
   * @returns {Array | null}
   * 
  */

  this.range = function (start, end, step) {
    if (step === undefined) {
      step = 1;
    }
    if (end === undefined) {
      end = start;
      start = 0;
    }
    if (
      !LibCore.isNumber(start, true)
      || !LibCore.isNumber(end, true)
      || !LibCore.isNumber(step, true)
      || start > end
    ) return null;

    var numbers = [];
    for (var k = start; k <= end; k+=step) {
      numbers.push(k);
    }
    return numbers;
  }

  this.rand = function (minimum, maximum) {
    var self = this;
    return (
      self.isInteger(minimum)
      && self.isInteger(maximum)
    ) ? Math.floor((Math.random() * (maximum - minimum) + minimum)) : 0;
  }

  this.count = function (argument) {
    var self = this;
    if (!self.isArray(argument) && !self.isObject(argument)) return 0;
    return self.isArray(argument) ? argument.length : Object.keys(argument).length
  }
  
  /** 
   * @description To get the index of the first occurence of an item in an iterable
   * 
   * @param {haystack} - Array or String
   * @param {needle} - Any type
   * 
   * @returns {Integer | null}
   * 
  */

  this.getFirstIndex = function (haystack, needle) {
    var self = this;
    var itemIndex, item;
    if (
      !self.isArray(haystack)
      && !self.isString(haystack)
      && !self.isPlain(haystack)
    ) return null;

    // Turn to string if not string
    if (!self.isArray(haystack)) {
      haystack = `${haystack}`;
    } 

    for (itemIndex=0; itemIndex<haystack.length; itemIndex++) {
      item = haystack[itemIndex];
      if (item === needle) return itemIndex;
    }
    return null;
  }

  /**  
   * @description To duplicate a character a number of times as string
   * 
   * @param {character} - To be duplicated
   * @param {numOccurence} - Number of times to duplicate character
   * 
   * @returns {String}
  */

  this.duplicateCharacter = function (character, numOccurence) {
    var self = this;
    if (
      !self.isPlain(character)
      || !self.isInteger(numOccurence)
    ) return '';

    character = `${character}`;
    numOccurence = parseInt(numOccurence, 10);

    var duplicateString = '';
    for (i=0; i<numOccurence; i++) {
      duplicateString += character;
    }
    return duplicateString;
  }

  /**  
   * @description Copies php explode function to split a string into array
   * 
   * @param {argument}  - String to split
   * @param {delimeter} - Delimeter to use for spliting
   * 
   * @return {Array | null} 
  */

  this.explode = function (argument, delimeter) {
    var self = this;
    if (
      !self.isPlain(argument)
      || (
        !self.isPlain(delimeter)
        && delimeter !== undefined
      )
    ) return null;

    argument = `${argument}`;
    delimeter = delimeter === undefined ? '' : `${delimeter}`;
    var result = argument.split(delimeter);
    return self.isArray(result) ? result : null;
  }

}

LibCore = new LIB_CORE();