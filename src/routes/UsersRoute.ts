import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateCreateUser, validateLoginUser, validateUpdateUser } from '../middlewares/dataValidator';
import authJwt from '../middlewares/authJwt';

export class UsersRoute {
  private userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  createRouter(): Router {
    const router = Router();

    router.post('/users', validateCreateUser, this.userController.createUser.bind(this.userController));
    router.get('/users', authJwt.verifyToken, authJwt.isAdmin, this.userController.getUsers.bind(this.userController));
    router.get('/users/:id', authJwt.verifyToken, this.userController.getUserById.bind(this.userController));
    router.post('/auth/login', validateLoginUser, this.userController.login.bind(this.userController));
  
    // Route pour mettre à jour l'utilisateur
    router.put('/users/:id', authJwt.verifyToken, authJwt.isAdmin, validateUpdateUser, this.userController.updateUser.bind(this.userController));
    
    router.delete('/users/:id', authJwt.verifyToken, authJwt.isAdmin, this.userController.deleteUser.bind(this.userController));
    return router;
  }
}
