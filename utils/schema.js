const Joi = require('joi');

module.exports.menuSchema = Joi.object({
    menu: Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        availability: Joi.boolean().required(),
        image: Joi.string().url().optional().allow("", null),
    }).required(),
});

module.exports.orderSchema = Joi.object({
    order: Joi.object({
        quantity: Joi.string().required(),
        totalAmount: Joi.number().required(),
        status: Joi.string().required()
    }).required(),
});


