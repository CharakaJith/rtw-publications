const jwt = require('jsonwebtoken');
const logger = require('../middleware/logger/logger');

const Authenticate = {
  authenticate: async (req, res, next) => {
    try {
      // excluded routing paths
      const nonSecurePaths = ['/api/author/register', '/api/author/login', /^\/api\/book\/get\/\w+$/];

      if (nonSecurePaths.some((path) => (path instanceof RegExp ? path.test(req.path) : path === req.path))) {
        return next();
      } else {
        const token = req.headers.authorization;

        const decode = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        req.user = decode.tokenUser;

        next();
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Authentication failed!',
      });

      logger('error', false, '401', 'authentication failed', req);
    }
  },
};

module.exports = Authenticate;
