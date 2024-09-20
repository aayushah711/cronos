const CustomError = require("../utils/CustomError");

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    // Check if user already exists
    const existingUser = await this.userRepository.getUserByEmail(
      userData.email
    );
    if (existingUser) {
      throw new CustomError("User with this email already exists", 409);
    }

    return this.userRepository.createUser(userData);
  }

  async getUserById(id) {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id, userData) {
    return this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id) {
    return this.userRepository.deleteUser(id);
  }
}

module.exports = UserService;
