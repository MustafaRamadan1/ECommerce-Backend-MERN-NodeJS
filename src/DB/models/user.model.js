import {Schema, model} from 'mongoose';

import validator  from 'validator';

import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String, 
  role: {
    type: String, 
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    trim: true,
    minLength: [8, "Password Should be longer than 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Confirm Password Should be the same as password",
    },
  },
  DOB: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date, 
  CreatedAt: {
    type: Date, 
    default: Date.now()
  }
}, {
  toJSON:{
    virtuals: true
  },
  toObject: {
    virtuals: true
  }, 
  id: false
});

userSchema.virtual('age').get(function (){
  return new Date().getFullYear() - this.DOB.getFullYear();
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
});


userSchema.methods.changePassword = function (jwtInit){

  console.log(`jwt is ${jwtInit}`);
  if (this.passwordChangedAt)
  {
    const changedAt = parseInt(this.passwordChangedAt / 1000, 10);
    console.log(`the different between changed at , jwtinit`);
    console.log(changedAt, jwtInit);

    return jwtInit < changedAt;
  }
  return false;
}

userSchema.methods.toJSON = function (){

  const user  = this;

  const userObject  = user.toObject();

  delete userObject.password;

  delete userObject.__v;

  return userObject;

};
userSchema.methods.correctPassword = async function (inputPassword, userPassword)
{
  return await bcrypt.compare(inputPassword, userPassword);
}

const User = model("User", userSchema);

export default User;
