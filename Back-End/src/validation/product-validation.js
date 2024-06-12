import Joi from "joi";

const createProductValidation = Joi.object({
    name: Joi.string().required(),
    image: Joi.required(),
    stok: Joi.number().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().optional()
});

const updateProductValidation = Joi.object({
    name: Joi.string().optional(),
    image: Joi.optional(),
    stok: Joi.number().optional(),
    price: Joi.number().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional()
});

export {
    createProductValidation,
    updateProductValidation
}