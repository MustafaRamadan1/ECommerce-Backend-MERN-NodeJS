import joi from 'joi';

const signup = {
    body: joi.object({
        name: joi.string().min(3).pattern(/^[a-zA-Z]+$/).trim().required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.pattern.base': 'Name must contain only alphabets',
        }), 
        email: joi.string().trim().email().required().messages({
            'string.empty': 'email is required',
            'string.email': 'please provide a valid email',
        }), 
        password: joi.string().min(8).required().messages({
            'string.empty': 'password is required',
            'string.min': 'password must be at least 8 characters long',
        }),
        confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
            'string.empty': 'confirm password is required',
            'any.only': 'confirm password must match with password',
        }), 
        photo: joi.string(), 
        DOB: joi.date(),
        role: joi.string().valid('user', 'admin').default('user')
    })
};



const login = joi.object({
    email: joi.string().email().trim().required().messages({
        'string.empty': 'email is required',
        'string.email': 'please provide a valid email',
    }),
    password: joi.string().min(8).required().messages({
        'string.empty': 'password is required',
        'string.min': 'password must be at least 8 characters long',
    })
});

const activateUser = {
    params: joi.object().keys({
        token: joi.string().required().hex().length(64).messages({
            'string.length': 'Token should be 64 charachter'
        })
    })
};


const updatePassword = {
    body: joi.object().keys({
        currentPassword: joi.string().min(8).required().messages({
            'string.empty': 'password is required',
            'string.min': 'password must be at least 8 characters long',
        }),
        newPassword: joi.string().min(8).required().messages({
            'string.empty': 'password is required',
            'string.min': 'password must be at least 8 characters long',
        })  
    })
};

const forgetPasswordToken = {

    params: joi.object().keys({
        token: joi.string().hex().length(64).required().messages({
            'string.empty': 'ForgetPassword Token is required',
            'string.length': 'Token should be 64 character'
        })
    }),
    body: joi.object().keys({
        password: joi.string().min(8).required().messages({
            'string.empty': 'password is required',
            'string.min': 'password must be at least 8 characters long',
        }),
        confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
            'string.empty': 'confirm Password is required',
            'string.min': 'confirm Password must be at least 8 characters long',
        })  
    })
};


const forgetPasswordForEmail = {
    body: joi.object().keys({
        email: joi.string().email().required().messages({
            'string.email': 'Please provide a valid Email'
        })
    })
}
export default {signup, login, activateUser, updatePassword, forgetPasswordToken, forgetPasswordForEmail};