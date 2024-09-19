class UserRepository {
  constructor({ db }) {
    this.db = db;
  }

  async createUser(user) {
    return Promise.resolve({ id: 1, name: "John Doe" });
  }

  async getUserById(id) {}

  async updateUser(id, user) {}

  async deleteUser(id) {}
}

module.exports = UserRepository;
