import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  passwordHashed: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isGoogleAuth: {
    type: Boolean,
    required: true,
  },
  house: {
    type: mongoose.Number,
    required: true,
    min: 1,
    max: 12,
  },
  sign: {
    type: mongoose.Number,
    required: true,
    min: 1,
    max: 12,
  },
  googleTokens: {
    type: {},
  },
  preferences: {
    type: {},
  },
  timezoneOffset: {
      type: mongoose.Number
  }
});

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: function (plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

userSchema.pre("save", function (next) {
  if (this.passwordHashed) {
    next();
  } else {
    if (!this.password) {
      console.log("SAVING USER: NO PASSWORD");
    } else {
      this.passwordHashed = true;
      this.password = this.hashPassword(this.password);
    }
    next();
  }
});

export default mongoose.model("users", userSchema);
