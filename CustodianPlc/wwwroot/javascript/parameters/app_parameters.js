
function AppParameters () {

  this.custodianCareEmail = function () {
    // return 'abdulfataiaka@gmail.com';
    return 'carecentre@custodianinsurance.com';
  }

  this.quoteParameters = function (template) {
    return {
      // to: 'abdulfataiaka@gmail.com',
      to: 'carecentre@custodianinsurance.com',
      toname: 'Custodian and Allied Insurance Plc.',
      subject: 'Custodian Quotation Details',
      template: template
    };
  }

}

AppParams = new AppParameters();