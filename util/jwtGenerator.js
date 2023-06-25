const jwt = require('jsonwebtoken');

const JwtGenerator = {
  generateNewAccessToken: async (tokenUser) => {
    try {
      // generate token
      return jwt.sign({ tokenUser }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = JwtGenerator;
