import { User } from './auth.model'

export default class AuthController {
  async signup(data) {
    return await User.create(data)
  }
}