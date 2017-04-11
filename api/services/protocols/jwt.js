/*
 * Json Web Token Authentication Protocol
 *
 */

module.exports = function(req, token, next) {

    sails.models.user.findOne({id: token.sub}, function (err, user) {

        if (err) { return next(err); }
        if (!user) { return next(null, false); }

        sails.models.passport.findOne({
            protocol : 'local'
            , user     : user.id
        }, function (err, passport) {

            if (err) { return next(err); }

            return next(null, user, passport);
        });
    });
};
