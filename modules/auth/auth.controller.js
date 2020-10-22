const User = require('./auth.model');

class AuthController {
  async signup(data) {
    return await User.create(data);
  }
}

module.exports = AuthController;
