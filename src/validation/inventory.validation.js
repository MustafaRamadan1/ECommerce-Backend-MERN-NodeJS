import Joi from 'joi';

const inventory = {
    body: Joi.object().keys({
        productId: Joi.string().trim().guid({ version: 'uuidv4' }).message('Product ID must be a UUID'),
        stock_quantity: Joi.number()
        .min(0)
        .messages({
            'number.min': 'Quantity must be positive number',
        }),

    }),
    params: Joi.object().keys({
        id: Joi.string().trim().guid({ version: 'uuidv4' })
        .message('Inventory ID must be a UUID'),
    })
}



export default {
    inventory,
}
