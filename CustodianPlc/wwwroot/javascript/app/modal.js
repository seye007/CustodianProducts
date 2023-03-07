
function MODAL () {

  var modalDomId = '#modal';
  var mainModal = '.modal-main';

  this.open = function (modalId) {
    $(modalDomId).css('display', 'block');
    $(`#${modalId}`).css('display', 'block');
  }

  this.close = function () {
    $(modalDomId).css('display', 'none');
    $(mainModal).css('display', 'none');
  }

}

Modal = new MODAL();