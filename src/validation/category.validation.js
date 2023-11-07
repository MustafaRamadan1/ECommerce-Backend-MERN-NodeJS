import Joi from 'joi';

const category = {
    body: Joi.object().keys({
        name: Joi.string()
        .min(3)
        .max(100)
        .trim()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .messages({
            'string.min': 'Category name must be at least 3 characters',
            'string.max': 'Category name must be at most 100 characters',
            'string.pattern.base' : 'Category name must contain only alphabet letter or numbers',
        }),
        description : Joi.string().min(5).max(255).pattern(/^[a-zA-Z0-9\s]+/).messages({
            'string.min' : 'Description must be at least 5 characters',
            'string.max' : 'Description must be less than 255 characters',
            'string.pattern.base' : 'Description must contains at least one letter and numbers',
            }),
    }),
}



export default {
    category,
}
