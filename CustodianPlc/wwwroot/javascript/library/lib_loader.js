
function LIB_LOADER () {

  var accessible = function (loaderId) {
    var counterId = loaderId + '-counter'
    return (
      LibDom.exists(loaderId)
      && LibDom.exists(counterId)
      && LibDom.tagname(counterId) == 'input'
    );
  }

  var getCount = function (loaderId) {
    if (!accessible(loaderId)) return 0;
    var counterId = loaderId + '-counter';
    var value = $(`#${counterId}`).val();
    if (LibCore.isInteger(value)) return parseInt(value, 10);
    return 0;
  }

  var addCount = function (loaderId) {
    if (!accessible(loaderId)) return 0;
    var counterId = loaderId + '-counter';
    var count = getCount(loaderId);
    $(`#${counterId}`).val(count+1);
    return true;
  }

  var remCount = function (loaderId) {
    if (!accessible(loaderId)) return 0;
    var counterId = loaderId + '-counter';
    var count = getCount(loaderId);
    $(`#${counterId}`).val(count-1);
    return true;
  }

  this.open = function (loaderId, display) {
    if (!accessible(loaderId)) return 0;
    var counterId = loaderId + '-counter';
    var activeField = loaderId + '-active';
    display = display === undefined ? 'inline-block' : display;
    if (!LibCore.inArray(['inline-block', 'block', 'inline'], display)) return;
    $(`#${loaderId}`).css('display', display);
    if (LibDom.exists(activeField)) LibDom.set(activeField, 'true');
    addCount(loaderId);
  }

  this.active = function (loaderId) {
    var activeField = loaderId + '-active';
    var value = LibDom.get(activeField);
    return value === "true";
  }

  this.close = function (loaderId) {
    if (!accessible(loaderId)) return 0;
    var counterId = loaderId + '-counter';
    var activeField = loaderId + '-active';
    remCount(loaderId);
    var count = getCount(loaderId);
    if (count <= 0) {
      $(`#${loaderId}`).css('display', 'none');
      if (LibDom.exists(activeField)) LibDom.set(activeField, 'false');
    }
  }

}

LibLoader = new LIB_LOADER();