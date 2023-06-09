import passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const GOOGLE_CLIENT_ID = '1095594983604-8noehb0pm6hhf97u7sgvg793noisjjup.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

// passport.serializeUser<any, any>((user, done) => {
//   // done(null, user)
// })

// passport.deserializeUser<any, any>((user, done) => {
//   // done(null, user)
// })

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://www.flyfrag.cn:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // Callback function to handle user profile data
      // and store it in the database or session
      console.log(' Callback function to handle user profile data', profile)
      cb(null, profile)
    }
  )
)
export default passport
