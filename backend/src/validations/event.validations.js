const Joi = require("joi");

const validateCreatedEvent = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    event_type: Joi.string().valid("live", "online"),
    fee: Joi.number().min(0),
    start_date: Joi.date()
      .required()
      .greater(Date.now() + 48 * 60 * 60 * 1000),
    end_date: Joi.date().min(Joi.ref("start_date")),
    location: Joi.string().min(3),
    max_participants: Joi.number().min(1).required(),
    event_link: Joi.string(),
    image: Joi.string().regex(/.(jpg|jpeg|png|gif)$/i),
    created_By: Joi.string(),
    vendor: Joi.string(),
    category: Joi.array().items(Joi.string()).required(),
  }).min(1);

  return schema.validate(body);
};
const validateUpdatedEvent = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(10),
    event_type: Joi.string().valid("live", "online"),
    fee: Joi.number().min(0),
    start_date: Joi.date().greater(Date.now() + 48 * 60 * 60 * 1000),
    end_date: Joi.date().min(Joi.ref("start_date")),
    location: Joi.string().min(3),
    event_link: Joi.string(),
    image: Joi.string().regex(/\.(jpg|jpeg|png|gif)$/i),
    max_participants: Joi.number().min(1),
  }).min(1); // Require at least one field

  return schema.validate(body);
};

module.exports = { validateCreatedEvent, validateUpdatedEvent };
