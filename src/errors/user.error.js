class UserError extends Error {

    constructor(message) {
        super(message);
        this.name = 'UserError';
        Error.captureStackTrace(this, this.constructor);
    }
}

class UserEmailNotFoundError extends UserError {

    constructor(message) {
        super();
        this.message = message || 'Adresse e-mail inconnue.';
        this.statusCode = 404;
    }
}

class UserAlreadyExistError extends UserError {

    constructor(message) {
        super();
        this.message = message || 'Adresse email déjà utilisée.';
        this.statusCode = 400;
    }
}

class UserBadCredentialsError extends UserError {

    constructor(message) {
        super();
        this.message = message || 'Identifiants invalides.';
        this.statusCode = 403;
    }
}

class UserBadRequestError extends UserError {
    constructor(message) {
        super();
        this.message = message || '';
        this.statusCode = 400;
    }
}

module.exports = {
    UserError,
    UserEmailNotFoundError,
    UserAlreadyExistError,
    UserBadCredentialsError,
    UserBadRequestError
};