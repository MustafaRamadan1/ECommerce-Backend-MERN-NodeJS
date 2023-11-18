import {Schema, model} from 'mongoose';

import validator  from 'validator';

import bcrypt from 'bcryptjs';

import crypto from 'crypto';

import Cart from './cart.model';
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
    minLength: [8, "Password Should be longer than 8 characters"]
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
  activateToken: String,
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
  ,
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
});


userSchema.methods.changePassword = function (jwtInit){

 
  if (this.passwordChangedAt)
  {
    const changedAt = parseInt(this.passwordChangedAt / 1000, 10);

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
userSchema.methods.correctPassword = async function (inputPassword)
{
  return bcrypt.compare(inputPassword, this.password);
}


userSchema.methods.createActivateToken = function (){

  const activateToken = crypto.randomBytes(32).toString('hex');

  this.activateToken = crypto.createHash('sha256').update(activateToken).digest('hex');

  return activateToken;
}

userSchema.methods.createPasswordResetToken = function (){

  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
  
}



userSchema.post('save', async function (doc , next){

  const existCart = await Cart.findOne({userId: doc._id});

  if (!existCart){

    const newCart = await Cart.create({userId: doc._id});
  }

  next();
})
const User = model("User", userSchema);

export default User;
