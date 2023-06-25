const { phone } = require('phone');

const Validator = {
  validateUserInputs: {
    checkIfEmptyString: async (field, fieldName) => {
      if (!field || field.trim().length === 0) {
        throw new Error(`${fieldName} field is empty!`);
      }
    },

    validateEmail: async (email) => {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email || email.trim().length === 0) {
        throw new Error('Email field is empty!');
      }

      if (!String(email).match(emailformat)) {
        throw new Error('Invalid email format!');
      }
    },

    validateMobileNumber: async (mobile) => {
      if (!mobile || mobile.trim().length === 0) {
        throw new Error('Mobile number field is empty!');
      }

      const num = phone(mobile, { country: 'LK' });
      if (!num.isValid || mobile.charAt(0) !== '+') {
        throw new Error('Invalid mobile number format!');
      }
    },
  },
};

module.exports = Validator;
