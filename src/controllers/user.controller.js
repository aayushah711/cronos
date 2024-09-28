class UserController {
  constructor({ userService, handleError }) {
    this.userService = userService;
    this.handleError = handleError;
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      const { password, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async loginUser(req, res) {
    try {
      const user = await this.userService.loginUser(req.body);
      return res.status(200).json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async logoutUser(req, res) {
    try {
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
