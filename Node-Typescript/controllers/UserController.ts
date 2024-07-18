import {Request,Response} from 'express';
import userService from '../services/UserService';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.json(user);
      }
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      console.log(req.body)
      const user = await userService.createUser(req.body);

      res.status(201).json(user);
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.json(user);
      }
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.send('User deleted successfully');
      }
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }
  
}


export default new UserController();
