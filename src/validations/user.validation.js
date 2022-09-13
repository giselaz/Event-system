const Joi = require('joi');


const validateRegister = (body)=>{
    const schema = Joi.object({
        email: Joi.string().email().min(3).required(),
        name: Joi.string().min(3).max(24).required(),
        surname: Joi.string().min(3).max(24).required(),
        password :Joi.string().min(6).max(20).required()
    })

    return schema.validate(body);
   
}
const validateLogin =(body)=>{
    const schema =Joi.object({
        email: Joi.string().email().min(3).required(),
        password :Joi.string().min(6).max(20).required()
    })
return schema.validate(body);

}
const validateRole =(body)=>{
    const schema = Joi.object({
        userType:Joi.string().valid('admin','user','pedagog')
    })
    return schema.validate(body)
}
module.exports={validateLogin,validateRegister,validateRole}