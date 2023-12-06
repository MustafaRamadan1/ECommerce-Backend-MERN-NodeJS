import joi from 'joi';

const createCartItem = {
    body: joi.object().keys({
        productId: joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/, 'object Id').message(', Invalid Object Id '),
        quantity: joi.number().min(0).messages({
            'number.base': 'quantity should be a number',
            'number.min': 'quantity should be 0 or more '
        })
    })
};

const updateCartItem = {
    params: joi.object().keys({
        id: joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/, 'object Id').message(', Invalid Object Id '),

    }),

    body: joi.object().keys({
        quantity:joi.number().min(0).messages({
            'number.base': 'quantity should be a number',
            'number.min': 'quantity should be 0 or more '
        })
    })
};

const deleteCartItem ={
    params: joi.object().keys({
        id: joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/, 'object Id').message(', Invalid Object Id '),

    })

}

export default {createCartItem, updateCartItem, deleteCartItem};