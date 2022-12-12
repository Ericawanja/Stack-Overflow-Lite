const Joi = require("joi")

const schema = Joi.object({
    "user_id":Joi.string().required(),
    "answer":Joi.string().min(25).required(),
    "question_id":Joi.string().required()

})

module.exports = {
    validate: (data)=>{
        return schema.validate(data)
    }
}