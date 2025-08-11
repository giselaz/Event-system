const Joi = require("joi");
const validateCreateCategory = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10),
    image: Joi.string(),
  });
  return schema.validate(body);
};

const validateUpdatedCategory = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(10),
    image: Joi.string(),
  });
  return schema.validate(body);
};
module.exports = { validateUpdatedCategory, validateCreateCategory };
