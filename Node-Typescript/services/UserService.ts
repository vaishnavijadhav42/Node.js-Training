import userModel from "../models/users";


class UserService {
  async getAllUsers() {
    return await userModel.find();
  }

  async getUserById(id: string) {
    return await userModel.findById(id);
  }

  async createUser(data: { name: string, email: string, contact: string }) {
    //console.log(data.name)
    const user = new userModel(data);
    return await user.save();
  }

  async updateUser(id: string, data: { name?: string, email?: string,contact?: string }) {
    return await userModel.findByIdAndUpdate(id, data);
  }

  async deleteUser(id: string) {
    return await userModel.findByIdAndDelete(id);
  }
}

export default new UserService();
