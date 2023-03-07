/*
function STEP_TWO_PERSONAL_ACCIDENT () {
  
  this.quoteCode = LibCore.rand(99999999, 999999999999);

  var IdentificationImage = new LIB_FILE("identification_image_file");

  this.nextButton = (
    LibDom.exists('personal-accident-next-second')
  ) ? $('#personal-accident-next-second') : null;

  this.fields = [
    'start_date',
    'policy_period',
    'units',
    'identification_type',
    'identification_number',
    'premium',
    'company_name',
    'company_address',
    'beneficiary_name',
    'beneficiary_dob',
    'beneficiary_gender',
    'beneficiary_relationship'
  ];

 *//* this.rules = {
    start_date: 'required|date:=future',
    policy_period: 'required',
    units: 'required|integer',
    identification_type: 'required',
    identification_number: 'required',
    premium: 'required|numeric|gt:0',
    company_name: 'required',
    company_address: 'required',
    beneficiary_name: 'required|alpha:spaced',
    beneficiary_dob: 'required|date:=past',
    beneficiary_gender: 'required',
    beneficiary_relationship: 'required',
  };

  this.errors = {
    start_date: 'Please select a valid insurance start date',
    policy_period: 'Please choose a policy period',
    units: 'Please select number of units',
    identification_type: 'Please select an identification type',
    identification_number: 'Please enter an identification number',
    premium: 'Premium not correctly computed',
    company_name: 'Please enter company name',
    company_address: 'Please enter company address',
    beneficiary_name: 'Please enter beneficiary name',
    beneficiary_dob: 'Please select a valid beneficiary date of birth',
    beneficiary_gender: 'Please select beneficiary gender',
    beneficiary_relationship: 'Please enter your relationship with beneficiary',
  };*//*

  this.valIdImage = function () {
    var size = IdentificationImage.getSize();
    if ((
      IdentificationImage.isPNG()
      || IdentificationImage.isJPG()
      || IdentificationImage.isPDF()
    ) && size && size <= 500000
    ) return true;
    
    var errMsg = 'Please select a valid image for identification';
    swal({
      type: 'error',
      title: errMsg
    });
    return { identification_image :  errMsg };
  }

  this.validate = function () {
    var self = this;
    LibDom.validateForm('personal-accident-form');

    var data = LibDom.getMany(self.fields);
    var result = LibVal.make(data, self.rules, self.errors);
    if (result === true) {
      result = self.valIdImage();
      if (result === true) return true;
    }
    swal({
      type: 'error',
      title: Object.values(result)[0]
    });
    return false;

  }

  this.toStepThree = function () {
    $('#step-2').css('display', 'none');
    $('#step-3').css('display', 'flex');
  }

  this.setPremium = function (value) {
    if (!LibCore.isNumber(value)) return;
    $('#premium').val(value);
    $('#showcase-premium').val(LibCore.toNgCurrencyFormat(value));
  }

  this.setPremiumByUnits = function () {
    var self = this;
    var unit = LibDom.get('units');
    var value = 0;
    if (LibCore.isInteger(unit)) {
      value = parseInt(unit, 10) * 1000;
    }
    self.setPremium(value);
  }

  this.bindUnitsToChange = function () {
    var self = this;
    var unit;
    $('#units').on('change', function () {
      self.setPremiumByUnits();
    });
  }

  this.Stepthree = function () {
    $("#step-2").hide();
    $('#step-3').removeClass('no-show');
    $("#step-3").show();
	}

  this.bindNextBtnToClick = function () {
    var self = this;
    var result;
    if (self.nextButton === null) return;
    self.nextButton.on('click', function (event) {
      event.preventDefault();
      result = self.validate();
      if (result === true) {
        self.Stepthree();
        var clientName = $('#title').val() + ' ' + $('#surname').val() + ' ' + $('#firstname').val();
        var showcase_premium = $('#showcase-premium').val();
        window.alert(showcase_premium);
        var start_date = $('#start_date').val();
        window.alert(start_date);
        var company_name = $('#company_name').val();
        window.alert(company_name);
        var policy_period = $('#policy_period').val();
        window.alert(policy_period);
        $('#pre_client_name').text(start_date);
        $('#pre_sum_assured').text(showcase-premium);
        $('#pre_insurance_start_date').text(company_name);
        $('#pre_payment_option').text(policy_period).show();
        $('#company_name').text(company_name);
      }
    });
  }

  this.init = function () {
    var self = this;
    LibDom.set('quote_code', self.quoteCode);
    self.bindNextBtnToClick();
    self.setPremiumByUnits();
    self.bindUnitsToChange();
  }

}*/