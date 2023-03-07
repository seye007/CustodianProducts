
function LIB_CURRENCY () {

  this.toNgFormat = function (argument) {
    var self = this;
    if (!LibCore.isNumber(argument)) return null;
    argument = parseFloat(argument);
    return argument.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

}

LibCurrency = new LIB_CURRENCY();
