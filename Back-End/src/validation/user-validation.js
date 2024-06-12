import Joi from 'joi';

const registerValidation = Joi.object({
    email: Joi.string().max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
    confirmPassword: Joi.string().min(5).valid(Joi.ref('password')).required().strict(),
    name: Joi.string().max(100).required(),
    no_telp: Joi.string().max(15).min(11).required(),

});

const loginValidation = Joi.object({
    email: Joi.string().max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
});

const forgotPasswordValidation = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordValidation = Joi.object({
    newPassword: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.string().min(8).valid(Joi.ref('newPassword')).required().strict(),
});

const createUserValidation = Joi.object({
    email: Joi.string().max(50).required().email(),
    name: Joi.string().max(30).required(),
    role: Joi.string().required(),
    no_telp: Joi.string().required().min(11),
});

const updateUserValidation = Joi.object({
    email: Joi.string().max(50).optional().email(),
    name: Joi.string().max(30).optional(),
    role: Joi.string().optional(),
    no_telp: Joi.string().optional().min(11),
});

const changePasswordValidation = Joi.object({
    oldPassword: Joi.string().min(8).max(100).required(),
    newPassword: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.string().min(8).valid(Joi.ref('newPassword')).required().strict(),
})


const updateProfileValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    no_telp: Joi.string().max(13).min(11).optional(),
    image: Joi.string().max(100).optional(),
});


export {
    loginValidation,
    registerValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    createUserValidation,
    updateUserValidation,
    changePasswordValidation,
    updateProfileValidation
}