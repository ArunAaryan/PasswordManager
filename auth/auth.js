const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.model");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;

const dotenv = require("dotenv");
dotenv.config();
// ...

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      // emailField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const email = req.body.email;
        console.log(email);
        console.log("username email pass", username, email, password);
        const user = await UserModel.create({ username, password, email });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.checkPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
