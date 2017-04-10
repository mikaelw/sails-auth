let authHook = sails.hooks.auth;

var Marlinspike = require('marlinspike');

if (!authHook) {
  class Auth extends Marlinspike {

    constructor(sails) {
      super(sails, module)
    }

    configure() {
      sails.services.passport.loadStrategies()
    }
  }

  authHook = Marlinspike.createSailsHook(Auth)
}

export default authHook;