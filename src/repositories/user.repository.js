let users = []

class UserRepository {

    constructor() { }

    async findById(id) {
        return users.find(user => user.id === id);
    }

    async findByEmail(email) {
        return users.find(user => user.email === email);
    }

    async add(user) {
        users.push(user);
    }
}

module.exports = UserRepository;