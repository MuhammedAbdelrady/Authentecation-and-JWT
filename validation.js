//we be imported to auth.js to make controller able to authenticate user inputs and info
const joi = require("joi");
//Register validation
const registerValidation = (data) => {
  const newSchema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  const regUser = newSchema.validate(data)
  return regUser;
};

//Login validation
const loginValidation = (data) => {
  const newSchema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
  })
  const loginUser = newSchema.validate(data)
  return loginUser
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

