IndexLifeConfig = null;
try {
  IndexLifeConfig = LibCore.isFunction (getIndexLifeConfig) ? getIndexLifeConfig() : null;
  IndexLifeConfig = LibCore.isObject(IndexLifeConfig) ? IndexLifeConfig : null;
} catch (e) {}

IndexLifeHandler = new INDEX_LIFE_HANDLER (IndexLifeConfig);

$(function () {
  
  LibDom.bindKeyUp('firstname', 'firstnameBind');
  LibDom.bindKeyUp('surname', 'surnameBind');

  IndexLifeHandler.bindTitleToChange();
  IndexLifeHandler.bindFirstNextToClick();
  IndexLifeHandler.bindSecondNextToClick();
  IndexLifeHandler.loadPaymentFrequency();
  IndexLifeHandler.bindCalcButtonToClick();
  IndexLifeHandler.bindPaymentFrequencyToChange();
  IndexLifeHandler.bindSumResetToFieldsChange();

});