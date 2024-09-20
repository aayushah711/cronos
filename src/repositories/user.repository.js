class UserRepository {
  constructor({ models }) {
    this.User = models.User;
  }

  async createUser(userData) {
    try {
      const user = await this.User.create(userData);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {}

  async updateUser(id, user) {}

  async deleteUser(id) {}
}

module.exports = UserRepository;
