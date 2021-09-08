import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsersController from './controllers/UsersController';
import LevelController from './controllers/LevelController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const routes = Router();
const upload = multer(uploadConfig);

const authenticateUserController = new AuthenticateUserController();

routes.post('/users', upload.array('avatar'), UsersController.create);
routes.post('/login', authenticateUserController.handle);
routes.post('/level', LevelController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.get('/level', LevelController.index);

export default routes;