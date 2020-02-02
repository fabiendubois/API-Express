const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

const JwtLib = require('../libs/jwt.lib');
const User = require('../models/user.model');
const UserDto = require('../models/user.dto.model');
const UserRepository = require('../repositories/user.repository');
const { UserEmailNotFoundError, UserAlreadyExistError, UserBadCredentialsError } = require('../errors/user.error');

const ROUND_SALT = 8;

class UserService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    async signIn(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                return { token: await JwtLib.generateJwt(user) };
            } else {
                throw new UserBadCredentialsError();
            }
        } else {
            throw new UserEmailNotFoundError();
        }
    }

    async signUp(email, password, role) {
        let userDto = new UserDto(email, password, role);
        if (await this.userRepository.findByEmail(email)) {
            throw new UserAlreadyExistError();
        }
        let hashedPassword = await bcrypt.hash(password, ROUND_SALT);
        let user = new User(uuidv1(), userDto.email, hashedPassword, role);
        await this.userRepository.add(user.toJson());
    }
}

module.exports = UserService;
