require('dotenv').config();

const {User} = require('./../models/userModel');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY_JWT
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const email = jwt_payload.email;
    const user = await User.findOne({email});
if(user){
    return done(null, user);
}
    return done({message: "Unauthorized"}, false);
}));

const auth = passport.authenticate('jwt', {session: false});

module.exports = auth;