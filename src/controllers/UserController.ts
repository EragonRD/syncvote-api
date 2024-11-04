import { Request, Response } from 'express'; 
import { UsersService } from '../services';
import { validationResult } from 'express-validator';
import authJwt from '../middlewares/authJwt'; // Assurez-vous d'importer votre middleware

export class UserController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async createUser(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
       response.status(400).json({
        status: 400,
        message: 'Bad request.',
        data: errors.array(),
      });
    }

    try {
      const { email, password, username } = request.body;
      const userData = { email, password, username };
      const userResponse = await this.usersService.createUser(userData);

      response.status(userResponse.status).send({
        ...userResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }

  async getUsers(request: Request, response: Response): Promise<void> {
    try {
      const usersResponse = await this.usersService.getUsers();

      response.status(usersResponse.status).send({
        ...usersResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }

  async getUserById(request: Request, response: Response): Promise<void> {
    try {
      if (request.params.id) {
        const usersResponse = await this.usersService.getUserById(request.params.id);

        response.status(usersResponse.status).send({
          ...usersResponse,
        });
      } else {
        response.status(404).json({
          status: 404,
          message: 'User not found'
        });
      }
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }

  async login(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
       response.status(400).json({
        status: 400,
        message: 'Bad request.',
        data: errors.array(),
      });
    }

    try {
      const { email, password } = request.body;
      const userData = { email, password };
      const userResponse = await this.usersService.login(userData);

      response.status(userResponse.status).json({
        ...userResponse
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }
  async updateUser(request: Request, response: Response): Promise<void> {
    // Vérifiez les erreurs de validation 
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
       response.status(400).json({
        status: 400,
        message: 'Bad request.',
        data: errors.array(),
      });
    }
  
    try {
      const { id } = request.params; // Récupérez l'ID de l'utilisateur à mettre à jour
      const updateData = request.body; // Récupérez les données à mettre à jour
  
      // Appelez le service pour mettre à jour l'utilisateur
      const userResponse = await this.usersService.updateUser(id, updateData);
  
      response.status(userResponse.status).json({
        ...userResponse
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }

  async deleteUser(request: Request, response: Response): Promise<void> {
    // Vérifiez d'abord si l'utilisateur a le rôle d'administrateur
    if (request.userRole !== 'admin') {
       response.status(403).json({
        status: 403,
        message: 'Require Admin Role!'
      });
    }
  
    try {
      const { id } = request.params;
  
      const userResponse = await this.usersService.deleteUser(id);
  
      if (userResponse.status === 200) {
        response.status(200).json({
          status: 200,
          message: 'User deleted successfully'
        });
      } else {
        response.status(userResponse.status).json({
          ...userResponse
        });
      }
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      });
    }
  }
}
