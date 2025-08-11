const Joi = require("joi");

const validateCreatedVendor = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    logo: Joi.string().regex(/.(jpg|jpeg|png|gif)$/i),
  });

  return schema.validate(body);
};

const validateUpdatedVendor = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    logo: Joi.string().regex(/.(jpg|jpeg|png|gif)$/i),
  });

  return schema.validate(body);
};

module.exports = { validateCreatedVendor,validateUpdatedVendor };
