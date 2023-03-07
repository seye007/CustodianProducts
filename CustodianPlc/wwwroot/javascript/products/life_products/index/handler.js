
function INDEX_LIFE_HANDLER (LifeConfig) {

  this.showLoader = function () {
    LibLoader.open('step-two-loader');
  }

  this.hideLoader = function () {
    LibLoader.close('step-two-loader');
  }

  this.swalError = function (message) {
    swal({
      type: 'error',
      title: message
    });
  }

  this.setTitle = function (title) {
    if (LibCore.
      (title) && title.trim().length > 0) {
      LibDom.set('title', title.trim());
    }
  }

  this.toStepTwo = function () {
    $('#step-1').css('display', 'none');
    $('#step-2').css('display', 'flex');
  }

  this.getClientCodeData = function () {
    return {
      title: LibDom.get('title'),
      firstname: LibDom.get('firstname'),
      middlename: LibDom.get('middlename'),
      lastname: LibDom.get('surname'),
      date_of_birth: LibDom.get('date_of_birth'),
      gender: LibDom.get('gender'),
      email: LibDom.get('email'),
      telephone: LibDom.get('telephone'),
    };
  }

  this.getCalcPolicyData = function () {
    return {
      client_code: LibDom.get('client_code'),
      product_code: LibDom.get('product_code'),
      payment_frequency: LibDom.get('payment_frequency_code'),
      policy_term: LibDom.get('policy_term'),
      amount: LibDom.get('save_amount')
    };
  }

  this.stepOnevalidate = function () {
    var self = this;

    var data = LibDom.getMany(LifeConfig.stepOne.fields);
    var result = LibVal.make(data, LifeConfig.stepOne.rules, LifeConfig.stepOne.errors);
    if (result === true) return true;
    swal({
      type: 'error',
      title: Object.values(result)[0]
    });
    return false;

  }

  // This and the nect methods should be removed in favour of refacturing
  this.stepTwoRules = function () {
    var rules = LifeConfig.stepTwo.rules;
    var saveAmountMin = LibDom.get('save_amount_minimum');
    saveAmountMin = !LibCore.isNumber(saveAmountMin) ? 2000 : parseFloat(saveAmountMin);
    rules.save_amount = `required|gteq:${saveAmountMin}`;
    return rules;
  }

  this.stepTwoErrors = function () {
    var errors = LifeConfig.stepTwo.errors;
    var saveAmountMin = LibDom.get('save_amount_minimum');
    saveAmountMin = !LibCore.isNumber(saveAmountMin) ? 2000 : parseFloat(saveAmountMin);
    errors.save_amount = `Amount to save should be ${saveAmountMin} or more.`;
    return errors;
  }

  this.stepTwoMiniValidate = function () {
    var self = this;
    var data = LibDom.getMany([
      'save_amount',
      'payment_frequency',
      'payment_frequency_code',
      'policy_term',
    ]);

    var result = LibVal.make(data, self.stepTwoRules(), self.stepTwoErrors());
    if (result === true) return true;
    return Object.values(result)[0];
  }

  this.stepTwoValidate = function () {
    var self = this;
    var data = LibDom.getMany(LifeConfig.stepTwo.fields);
    var result = LibVal.make(data, self.stepTwoRules(), self.stepTwoErrors());
    if (result === true) return true;
    self.swalError(Object.values(result)[0]);
    return false;
  }

  this.loadPolicyTerms = function () {
    var self = this;
    var clientCode = LibDom.get('client_code');
    var productCode = LibDom.get('product_code');

    self.showLoader();
    LifeProductsIndexCtrl.loadPolicyTerms ('policy_term', productCode, clientCode, function () {
      self.hideLoader();
    });
  }

  this.loadPaymentFrequency = function () {
    var self = this;
    var productCode = LibDom.get('product_code');
    self.showLoader();
    LifeProductsIndexCtrl.loadPaymentFrequency (productCode, 'payment_frequency_code', function () {
      self.updatePaymentFrequency();
      self.hideLoader();
    });
  }

  this.updatePaymentFrequency = function () {
    var value = $('#payment_frequency_code option:selected').text();
    LibDom.set('payment_frequency', value);
  }
  
  this.setClientCode = function (clientCodeLoaded) {
    var self = this;
    var data = self.getClientCodeData();
    self.resetSumsAssured();
    Modal.open('loader-modal');
    LifeProductsIndexCtrl.getClientCode(data, function (clientCode) {
      Modal.close();
      if (clientCode !== null) {
        LibDom.set('client_code', clientCode);
        clientCodeLoaded();
        self.loadPolicyTerms();
      } else {
        self.swalError('Client code could not be generated'); 
      }
    });
  }

  this.systemBusy = function () {
    var self = this;
    if(LibLoader.active('step-two-loader')) {
      self.swalError('System Busy');
      return true;
    } return false;
  }

  this.setSumAssured = function (value) {
    LibDom.set('sum_assured', value);
    LibDom.set('sum_assured_field', LibCore.toNgCurrencyFormat(value));
  }

  this.setLifeSumAssured = function (value) {
    LibDom.set('life_sum_assured', value);
    LibDom.set('life_sum_assured_field', LibCore.toNgCurrencyFormat(value));
  }

  this.calculate = function () {
    var self = this;
    var data = self.getCalcPolicyData();
    
    self.showLoader();
	self.toggleStepTwoFieldsState(true);
    LifeProductsIndexCtrl.calculateQuote (data, function (result) {
      if (result !== null) {
        LibDom.set('quote_code', result.quoCode);
        self.setSumAssured(result.sumInsured);
        var lifeCoverSumAssureds = (
          Array.isArray(result.lifeCoverSumAssureds)
          && result.lifeCoverSumAssureds.length > 0
        ) ? result.lifeCoverSumAssureds[0] : null;
		self.setLifeSumAssured(lifeCoverSumAssureds);
		
		// Set the breakdown if it exists.
		if (result.coverTypeAllocations != undefined && result.coverTypeAllocations != null && Array.isArray(result.coverTypeAllocations) && result.coverTypeAllocations.length > 0) {
			self.setInsuredBreakdown(result.coverTypeAllocations);
		}
      }
      self.hideLoader();
      self.toggleStepTwoFieldsState(false);
    });
  }

  this.setInsuredBreakdown = function(coverTypeAllocations) {
	var self = this;
	for (var i=0; i<coverTypeAllocations.length; i++) {
		var breakdownObj = coverTypeAllocations[i];
		if (breakdownObj.cvtShtDesc != undefined && breakdownObj.cvtSa != undefined) {
			LibDom.set(breakdownObj.cvtShtDesc.toLowerCase(), LibCore.toNgCurrencyFormat(breakdownObj.cvtSa));
		}
	}
  }

  this.bindFirstNextToClick = function () {
    var self = this;
    if (!LibDom.exists('first-next-button')) return;
    $('#first-next-button').on ('click', function () {
      var result = self.stepOnevalidate();
      if (result !== true) return;
      self.setClientCode(function () {
        self.toStepTwo();
      });
    });
  }

  this.bindSecondNextToClick = function () {
    var self = this;

    if (!LibDom.exists('second-next-button')) return;
    $('#second-next-button').on ('click', function () {
      if (self.systemBusy()) return;

      var result = self.stepTwoValidate();
      if (result === true) $('#product-form').submit();
    });
  }

  this.bindTitleToChange = function () {
    var self = this;
    self.setTitle($('#title_code option:selected').text());
    $('#title_code').on('change', function () {
      self.setTitle($('#title_code option:selected').text());
    });
  }

  this.bindPaymentFrequencyToChange = function () {
    var self = this;
    $('#payment_frequency_code').on('change', function () {
      self.updatePaymentFrequency();
    });
  }

  this.bindCalcButtonToClick = function () {
    var self = this;
    if (!LibDom.exists('calculate-policy-button')) return;
    $('#calculate-policy-button').on ('click', function () {
      
      if (self.systemBusy()) return;

      var validate = self.stepTwoMiniValidate();
      if (validate !== true) return self.swalError(validate);

      self.calculate();

    });
  }

  this.toggleStepTwoFieldsState = function (state) {
    $('#save_amount, #payment_frequency_code, #policy_term')
      .prop('disabled', state === true);
  }

  this.resetSumsAssured = function () {
    LibDom.set('quote_code', '');
    LibDom.set('sum_assured', '');
    LibDom.set('sum_assured_field', '');
    LibDom.set('life_sum_assured', '');
    LibDom.set('life_sum_assured_field', '');
  }

  this.bindSumResetToFieldsChange = function () {
    var self = this;

    $('#calculate-policy-button').on('click', function () {
      self.resetSumsAssured();
    });

    $('#save_amount').on('keyup', function () {
      self.resetSumsAssured();
    });

    $('#payment_frequency_code, #policy_term').on('change', function () {
      self.resetSumsAssured();
    });
    
  }

}