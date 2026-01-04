const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: [3, "must have atleast 3 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is mandatory"],
    lowercase: true,
    validate: [validator.isEmail, "Enter correct email address"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "must enter password"],
    minlength: 8,
    select: false,
  },
  passwordconfirm: {
    type: String,
    required: [true, "you Have to confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Enter Correct Password",
    },
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const users = mongoose.model("users", userSchema);
module.exports = users;
