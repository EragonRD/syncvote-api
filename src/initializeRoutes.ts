import * as controllers from './controllers';
import * as routes from './routes';
import * as services from './services';
import {VerificationDatabase} from "./utils/VerificationDatabase";
import { FirestoreCollections } from './types/firestore';
import { RedisClientType } from 'redis';


export function initializeRoutes(db: FirestoreCollections, redisClient: RedisClientType) {
  const verificationDatabase = new VerificationDatabase(db);

  const usersService = new services.UsersService(db, redisClient);
  const userController = new controllers.UserController(usersService);
  const usersRoute = new routes.UsersRoute(userController);

  const postsService = new services.PostsService(db, redisClient);
  const postsController = new controllers.PostController(postsService, verificationDatabase);
  const postsRoute = new routes.PostsRoute(postsController);

  const commentsService = new services.CommentsService(db, redisClient);
  const commentsController = new controllers.CommentController(commentsService, verificationDatabase);
  const commentsRoute = new routes.CommentsRoute(commentsController);

  const votesService = new services.VotesService(db, postsService, commentsService);
  const votesController = new controllers.VotesController(votesService);
  const votesRoute = new routes.VotesRoute(votesController);


  return {
    usersRoute,
    postsRoute,
    commentsRoute,
    votesRoute,
  };
}
