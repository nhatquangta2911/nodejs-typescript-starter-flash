import { Request, Response } from 'express';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { userSchema } = require('../models/user');
const { BadRequest, SuccessResponse } = require('../helpers/ErrorHelper');
import logger from '../middlewares/logging';

const User = mongoose.model('users', userSchema, 'users');

const login = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return BadRequest(res, 'Invalid email or password');
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) return BadRequest(res, 'Invalid email or password');
    const token: string = user.generateAuthToken();
    return SuccessResponse(res, token);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return BadRequest(res, 'Email has already been registered');
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token: string = await user.generateAuthToken();
    return SuccessResponse(res, token);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

module.exports = {
  login,
  register
};
