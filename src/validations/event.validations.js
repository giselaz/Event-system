const Joi = require('joi');


const validateCreatedEvent =(body)=>{
    const schema = joi.object({
        emri:Joi.string().min(3).required(),
        pershkrimi:Joi.string().min(10),
        Lloji_Eventit:Joi.string().valid('live','online'),
        hyrja:Joi.number().min(0),
        data_fillimit:Joi.date().format("DD/MM/YYYY")
    })
}

module.exports={validateCreatedEvent}

