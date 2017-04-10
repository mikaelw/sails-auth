/*
 * Json Web Token Authentication Protocol
 *
 */

module.exports = function(req, token, next) {

    sails.models.user.findOne({id: token.id}, function (err, user) {

        if (err) {
            req.flash('error', err.message);
            return next(err);
        }

        if (!user) {
            req.flash('error', "USER_NOT_FOUND");
            return next("USER_NOT_FOUND");
        }

        sails.models.passport.findOne({
            protocol : 'local'
            , user     : user.id
        }, function (err, passport) {

            if (err) {
                req.flash('error', err.message);
                return next(null, false);
            }

            return next(null, user, passport);
        });
    });
};
