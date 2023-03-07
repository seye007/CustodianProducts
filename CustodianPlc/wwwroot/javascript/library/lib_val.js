function LIB_VAL () {

  var self = function () { return this; }
  
  var relation = function (argument, options, type) {
    if (
      !LibCore.isNumber(argument)
      || options.length !== 1
      || !LibCore.isNumber(options[0])
    ) return null;

    argument = parseFloat(argument);
    edgeValue = parseFloat(options[0]);

    switch (type) {
      case 'lt': return  argument < edgeValue;
      case 'gt': return  argument > edgeValue;
      case 'lteq': return  argument <= edgeValue;
      case 'gteq': return  argument >= edgeValue;
      case 'eq': return argument == edgeValue;
      default: return null;
    }
  }

  var dateState = function (argument, options) {
    var type = options[0];
    var refDate = undefined;
    if (options.length > 1 && LibDate.isDate(options[1])) {
      refDate = options[1];
    }
    switch (type) {
      case 'past': return LibDate.isPast(argument, refDate);
      case 'present': return LibDate.isPresent(argument, refDate);
      case 'future' : return LibDate.isFuture(argument, refDate);
      case '=past': return (
        LibDate.isPresent(argument, refDate)
        || LibDate.isPast(argument, refDate)
      );
      case '=future' : return (
        LibDate.isPresent(argument, refDate) 
        || LibDate.isFuture(argument, refDate)
      );
      default: return false;
    }
  }
  
  /** 
   * @description A method to check if argument is not empty
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.required = function (argument, options) {
    if (options.length !== 0) return null;
    return argument.trim() !== '';
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.min = function (argument, options) {
    if (options.length !== 1 || !LibCore.isInteger(options[0])) return null;
    var minvalue = parseInt(options[0]);
    return argument.length >= minvalue;
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.lt = function (argument, options) {
    return relation(argument, options, 'lt');
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.lteq = function (argument, options) {
    return relation(argument, options, 'lteq');
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.gt = function (argument, options) {
    return relation(argument, options, 'gt');
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.gteq = function (argument, options) {
    return relation(argument, options, 'gteq');
  }

  /** 
   * @description A method to confirm minimum characters on an argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.max = function (argument, options) {
    if (options.length !== 1 || !LibCore.isInteger(options[0])) return null;
    var maxvalue = parseInt(options[0]);
    return argument.length <= maxvalue;
  }

  
  /** 
   * @description 
   * An method to check that argument contains 
   * only alphas and consider spaced alphas
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.alpha = function (argument, options) {
    if (
      options.length > 1
      || (options.length === 1 && options[0] !== 'spaced')
    ) return null;

    if (options.length === 0) return /^[a-zA-Z]+$/.exec(argument) !== null;
    return /^[a-zA-Z ]+$/.exec(argument) !== null;
  }

  /** 
   * @description A method to validate for a valid email
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.email = function (argument, options) {
    if (options.length !== 0) return null;
    return /^.+@.+$/.exec(argument) !== null;
  }

  /** 
   * @description A method to validate for a valid date
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.date = function (argument, options) {
    var option;
    if (options.length <= 0) return LibDate.isDate(argument);
    return dateState(argument, options);
  }

  /** 
   * @description An method to check that argument is a number
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.numeric = function (argument, options) {
    if (options.length !== 0) return null;
    return LibCore.isNumber(argument);
  }

  /** 
   * @description An method to check that argument is an integer
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.integer = function (argument, options) {
    if (options.length !== 0) return null;
    return LibCore.isInteger(argument);
  }

  /** 
   * @description An method to check that argument is a decimal number
   * 
   * @type {Function}
   * 
   * @param {argument}
   * 
   * @returns {Boolean}
   *
  */

  this.decimal = function (argument, options) {
    if (options.length !== 0) return null;
    return LibCore.isFloat(argument);
  }

  /** 
   * @description An object that contains methods map to functions
   * 
   * @type {Object}
   * 
   * @returns {None}
   *
  */

  var methods = {
    min: this.min,
    max: this.max,
    alpha: this.alpha,
    numeric: this.numeric,
    integer: this.integer,
    decimal: this.decimal,
    required: this.required,
    email: this.email,
    date: this.date,
    lt: this.lt,
    lteq: this.lteq,
    gt: this.gt,
    gteq: this.gteq,
  };

  /** 
   * @description A method to run the rules agianst the argument
   * 
   * @type {Function}
   * 
   * @param {argument}
   * @param {rule}
   * 
   * @returns {Boolean | null}
   *
  */

  this.check = function (argument, rule) {
    if (!LibCore.isPlain(argument) || !LibCore.isString(rule)) return null;

    argument = `${argument}`;

    var rules = rule.split('|');
    var index, method, result;
    for (index in rules) {
      fullMethod = rules[index];
      
      // Extract option
      options = fullMethod.split(':');
      method = options.shift();
      
      if(!LibCore.inArray(Object.keys(methods), method)) return null;
      result = methods[method](argument, options);
      if (result !== true) return result;
    }
    return true;
  }

  /** 
   * @description A method to validate fields in an object
   * 
   * @type {Function}
   * 
   * @param {data}
   * @param {rules}
   * @param {errMsgs}
   * 
   * @returns {Object | true}
   *
  */

  this.make = function (data, rules, errMsgs) {
    var self = this;
    var errors = {}
    
    if (
      !LibCore.isObject(data)
      || !LibCore.isObject(rules)
      || LibCore.count(data) === 0
      || LibCore.count(data) > LibCore.count(rules)
    ) return null;

    errMsgs =  LibCore.isObject(errMsgs) ? errMsgs : {};

    for (field in data) {
      if (!(field in rules)){
        errors[field] = `No rules found for field ${field}`;
        continue;
      }
      rule = rules[field];
      value = data[field];
      var result = self.check(value, rule);
      if (result !== true) errors[field] = (field in errMsgs) ? errMsgs[field] : 'No error message provided';
    }

    if (LibCore.count(errors) === 0) return true;
    return errors;
  }
}

LibVal = new LIB_VAL();
