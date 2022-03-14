const db = require('./../mock-data/users-data');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY_JWT
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const user = db.getUserByEmail(jwt_payload.email);
if(user){
    return done(null, user);
}
    return done(null, false);
}));

const auth = passport.authenticate('jwt', {session: false});


module.exports = auth;