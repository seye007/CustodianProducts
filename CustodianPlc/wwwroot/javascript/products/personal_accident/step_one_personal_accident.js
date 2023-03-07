/*
function STEP_ONE_PERSONAL_ACCIDENT () {
  
  this.nextButton = (
    LibDom.exists('personal-accident-next-first')
  ) ? $('#personal-accident-next-first') : null;

  this.fields = [
    'title',
    'surname',
    'firstname',
    'date_of_birth',
    'gender',
    'email',
    'telephone',
    'address',
    'state',
    'occupation'
  ];

  this.rules = {
    title: 'required',
    surname: 'required|alpha',
    firstname: 'required|alpha',
    date_of_birth: 'required|date:=past',
    gender: 'required',
    email: 'required|email',
    telephone: 'required',
    address: 'required',
    state: 'required',
    occupation: 'required',
  };

  this.errors = {
    title: 'Please select a title',
    surname: 'Please provide your correct surname',
    firstname: 'Please provide your correct firstname',
    date_of_birth: 'Please choose your correct date of birth',
    gender: 'Please select your gender',
    email: 'Please provide a valid email address',
    telephone: 'Please provide a valid phone number',
    address: 'Please enter your address',
    state: 'Please select your state',
    occupation: 'Please enter your occupation',
  };

  this.validate = function () {
    var self = this;
    LibDom.validateForm('personal-accident-form');

    var data = LibDom.getMany(self.fields);
    var result = LibVal.make(data, self.rules, self.errors);
    if (result === true) return true;
    swal({
      type: 'error',
      title: Object.values(result)[0]
    });
    return false;

  }

  this.toStepTwo = function () {
    $('#step-1').css('display', 'none');
    $('#step-2').css('display', 'flex');
  }

  this.bindNextBtnToClick = function () {
    var self = this;
    var result;
    if (self.nextButton === null) return;
    self.nextButton.on('click', function () {
      result = self.validate();
      if (result === true) {
        self.toStepTwo();
      }
    });

  }

  this.init = function () {
    var self = this;
    self.bindNextBtnToClick();
  }

}*/