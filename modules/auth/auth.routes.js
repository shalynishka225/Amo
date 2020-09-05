import express from 'express'
import AuthController from './auth.controller';

const router = express.Router();

router.post('/', async (req, res) => {
  AuthController.signup();
})

export default router