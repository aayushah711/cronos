class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
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
