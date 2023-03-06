const { required } = require("joi");
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
    end_date: Joi.date().required().min(Joi.ref("start_date")),
    location: Joi.string().min(3),
    event_link: Joi.string().uri({
      scheme: ["http", "https"],
    }),
  });

  return schema.validate(body);
};

module.exports = { validateCreatedEvent };
