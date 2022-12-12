const Joi = require("joi")

const schema = Joi.object({
    "user_id":Joi.string().required(),
    "comment":Joi.string().min(15).required(),
    "answer_id":Joi.string().required()

})

module.exports = {
    validate: (data)=>{
        return schema.validate(data)
    }
}