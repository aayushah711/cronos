class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      const { password, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = UserController;
