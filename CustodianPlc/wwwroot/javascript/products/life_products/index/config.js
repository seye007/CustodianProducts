
function getIndexLifeConfig () {

  return {
    stepOne: {
      fields: [
        'title',
        'title_code',
        'firstname',
        'middlename',
        'surname',
        'date_of_birth',
        'gender',
        'email',
        'telephone',
        'start_date'
      ],
    
      rules: {
        title: 'required',
        title_code: 'required',
        firstname: 'required|alpha',
        middlename: 'required|alpha',
        surname: 'required|alpha',
        date_of_birth: 'required|date:=past',
        gender: 'required',
        email: 'required|email',
        telephone: 'required',
        start_date: 'required|date:=future',
      },
    
      errors: {
        title: 'Please select a title',
        title_code: 'Please select a title',
        firstname: 'Please provide your correct firstname',
        middlename: 'Please provide your correct middlename',
        surname: 'Please provide your correct surname',
        date_of_birth: 'Please choose your correct date of birth',
        gender: 'Please select your gender',
        email: 'Please provide a valid email address',
        telephone: 'Please provide a valid phone number',
        start_date: 'Please choose a correct start date of insurance',
      }
    },

    stepTwo: {
      fields: [
        'save_amount',
        'payment_frequency',
        'payment_frequency_code',
        'policy_term',
        'sum_assured',
      ],

      rules: {
        save_amount: 'required|gteq:2000',
        payment_frequency: 'required',
        payment_frequency_code: 'required',
        policy_term: 'required',
        sum_assured: 'required|numeric|gt:0',
      },
      
      errors: {
        save_amount: 'Amount to save should be 2,000 or more.',
        payment_frequency: 'Please select a payment frequency',
        payment_frequency_code: 'Please select a payment frequency',
        policy_term: 'Please select a policy term',
        sum_assured: 'Sum assured not properly computed',
      }
    }
  };

};
