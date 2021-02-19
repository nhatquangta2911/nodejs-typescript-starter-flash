const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
import config from '../../config';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.plugin(normalize);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email
    },
    config.JWT_SECRET_KEY,
    { expiresIn: '5h' }
  );
  return token;
};

module.exports.userSchema = userSchema;
