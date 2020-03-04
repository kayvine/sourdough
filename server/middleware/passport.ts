import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import UserModel from '../users/user.model';

export default passport => {
  //     secretOrKey = 'string',
  //     secretOrKeyProvider?: any,
  //     jwtFromRequest: JwtFromRequestFunction,
  //     issuer?: string,
  //     audience?: string, // sourdough
  //     algorithms?: string[]; // ['RS256']
  //     ignoreExpiration?: boolean;
  //     passReqToCallback?: boolean;
  //     jsonWebTokenOptions?: VerifyOptions

  const opts: StrategyOptions = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: 'Authorization/Resource/This server',
    audience: 'yoursite.com'
  };

  passport.use(
    new Strategy(opts, (payload, done) => {
      // Match user
      UserModel.findOne({ id: payload.sub }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        return done(null, user);
      });
    })
  );
};
