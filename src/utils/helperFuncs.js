import jwt from 'jsonwebtoken'
export const createToken = (payload) =>{
    return jwt.sign(payload, process.env.SECERTKEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};


