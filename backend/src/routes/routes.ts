import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));

export { router };