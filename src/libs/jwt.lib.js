const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR-JWT-SECRET';
const JWT_TTL = process.env.JWT_TTL || '1h';

class JwtLib {

    constructor() { }

    async generateJwt(user) {
        return jwt.sign({
            sub: user.id,
            role: user.role
        }, JWT_SECRET, { expiresIn: JWT_TTL });
    }
}

module.exports = new JwtLib();