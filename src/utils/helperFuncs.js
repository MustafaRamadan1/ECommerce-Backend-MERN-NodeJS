import jwt from 'jsonwebtoken'
export const createToken = (payload) =>{
    return jwt.sign(payload, process.env.SECERTKEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};

export  function formatItemForPayment(element){
    return {
        price_data: {
            currency: 'USD',
            product_data: {
              name: element.productId.name,
              description: element.productId.description

            },
            unit_amount: element.productId.price,
          },
          quantity: element.quantity,
        }
  }


