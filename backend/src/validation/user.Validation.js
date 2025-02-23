import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().trim().lowercase().max(30).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(6).required(),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required(),
  refreshToken: Joi.string().optional(),
});

export const validateUser = (userData) =>
  userValidationSchema.validate(userData, { abortEarly: false });
