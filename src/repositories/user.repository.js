class UserRepository {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async createUser(userData) {
    try {
      const user = await this.userModel.create(userData);
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
