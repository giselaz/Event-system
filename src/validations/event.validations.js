const Joi = require('joi');


const validateCreatedEvent =(body)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        description:Joi.string().min(10),
        event_type:Joi.string().valid('live','online'),
        fee:Joi.number().min(0),
        start_date:Joi.date().format("DD-MM-YYYY")
    })
}

module.exports={validateCreatedEvent}

