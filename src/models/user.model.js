class User {

    constructor(id, email, password, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    toJson() {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}

module.exports = User;