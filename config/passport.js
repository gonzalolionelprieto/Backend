import { model } from "mongoose";
import passport from "passport";
import local from "passport-local";
import User from "../models/userModel";
import { createHash, isValidPassword } from "../utils/utils";
const localStategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, passport, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await User.findOne({ email: username });
          if (user) {
            console.log("user already exist");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await User.create(newUser);
          done(null, result);
        } catch (err) {
          return done("error al obtener el user");
        }
      }
    )
  );
};

export default initializePassport;
