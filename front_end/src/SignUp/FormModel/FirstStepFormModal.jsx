export default {
    formId: 'signupform',
    formField: {
      name: {
        name: 'name',
        label: 'Name*',
        requiredErrorMsg: 'Name is required'
      },
      email: {
        name: 'email',
        label: 'Email*',
        requiredErrorMsg: 'Email is required',
        invalidErrorMsg: 'Invalid email'
      },
      mobilenumber: {
        name: 'mobilenumber',
        label: 'Mobile Number*',
        requiredErrorMsg: 'Mobile Number is required',
        invalidErrorMsg: 'Invalid mobile number'
      },
      password: {
        name: 'password',
        label: 'Password*',
        requiredErrorMsg: 'Password is required',
        invalidErrorMsg: 'Password must be of 5 letters'
      },
      confirmpassword: {
        name: 'confirmpassword',
        label: 'Confirm Password*',
        requiredErrorMsg: 'Confirm Password is required',
        invalidErrorMsg: 'Confirm Password does not match with the password'
      },
      role: {
        name: 'role',
        label: 'Select Role*',
        requiredErrorMsg: 'Role is required'
      },
    //   zipcode: {
    //     name: 'zipcode',
    //     label: 'Zipcode*',
    //     requiredErrorMsg: 'Zipcode is required',
    //     invalidErrorMsg: 'Zipcode is not valid (e.g. 70000)'
    //   },
    //   country: {
    //     name: 'country',
    //     label: 'Country*',
    //     requiredErrorMsg: 'Country is required'
    //   },
    //   useAddressForPaymentDetails: {
    //     name: 'useAddressForPaymentDetails',
    //     label: 'Use this address for payment details'
    //   },
    //   nameOnCard: {
    //     name: 'nameOnCard',
    //     label: 'Name on card*',
    //     requiredErrorMsg: 'Name on card is required'
    //   },
    //   cardNumber: {
    //     name: 'cardNumber',
    //     label: 'Card number*',
    //     requiredErrorMsg: 'Card number is required',
    //     invalidErrorMsg: 'Card number is not valid (e.g. 4111111111111)'
    //   },
    //   expiryDate: {
    //     name: 'expiryDate',
    //     label: 'Expiry date*',
    //     requiredErrorMsg: 'Expiry date is required',
    //     invalidErrorMsg: 'Expiry date is not valid'
    //   },
    //   cvv: {
    //     name: 'cvv',
    //     label: 'CVV*',
    //     requiredErrorMsg: 'CVV is required',
    //     invalidErrorMsg: 'CVV is invalid (e.g. 357)'
    //   }
    }
  };
  