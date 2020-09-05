import express from 'express'
import AuthController from './auth.controller';

const router = express.Router();

router.post('/', async (req, res) => {
  await AuthController.signup(req.body);
  return res.json(req.body)

})

export default router