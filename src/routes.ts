import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsersController from './controllers/UsersController';
import LevelController from './controllers/LevelController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const routes = Router();
const upload = multer(uploadConfig);

const authenticateUserController = new AuthenticateUserController();

routes.post('/users', upload.single('avatar'), UsersController.create);
routes.post('/login', authenticateUserController.handle);
routes.post('/level', LevelController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.get('/level', LevelController.index);
routes.put('/level/:id', ensureAuthenticated, LevelController.update);
routes.put('/user/:id', UsersController.update);

export default routes;