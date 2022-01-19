import { ObjectSchema } from 'joi';
import Joi = require("joi");

export const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(5).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'pl'] } }).required(),
  password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPassword: Joi.ref('password'),
});
