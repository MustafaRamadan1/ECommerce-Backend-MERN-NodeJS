import Joi from 'joi';

const product = {
    body: Joi.object().keys({
        name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .messages({
            'string.min': 'Product name must be at least 2 characters',
            'string.max': 'Product name must be at most 100 characters',
            'string.pattern.base' : 'Product name must contain only alphabet letter or numbers',
        }),
        price: Joi.number()
        .min(0)
        .messages({
            'number.min': 'Price must be positive number',
        }),
        description : Joi.string().trim().min(5).max(255).pattern(/^[a-zA-Z0-9\s]+/).messages({
            'string.min' : 'Description must be at least 2 characters',
            'string.max' : 'Description must be less than 50 characters',
            'string.pattern.base' : 'Description must contains at least one letter and numbers',
            }),
        categoryId: Joi.string().trim().pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.pattern.base' : 'Category ID is invalid',
        }),
        productImgs: Joi.any(),
        stock_quantity: Joi.number()
        .min(0)
        .messages({
            'number.min': 'Quantity must be positive number',
        }),
    }),
    params: Joi.object().keys({
        id: Joi.string().trim().guid({ version: 'uuidv4' })
        .message('Product ID must be a UUID'),
    })
}



export default {
    product,
}
