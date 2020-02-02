const Joi = require('@hapi/joi');
const { ROLES } = require('./role.enum.model');
const { UserBadRequestError } = require('../errors/user.error');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20),
    role: Joi.string().equal(...Object.values(ROLES)).required()
}).options({ abortEarly: false });

class UserDto {

    constructor(email, password, role) {
        const joiValidation = schema.validate(
            {
                email: email,
                password: password,
                role: role
            }
        );

        if (joiValidation.error) {
            throw new UserBadRequestError(joiValidation.error.stack);
        } else {
            this.email = email;
            this.password = password;
            this.role = role;
        }
    }
}

module.exports = UserDto;