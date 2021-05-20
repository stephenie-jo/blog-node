import { User } from '../../models/user'
export default class UserService {
  private Userdata: User = new User()

  async addUser (params): Promise<{ error: any; data: any; }> {
    try {
      let result = await this.Userdata.addUser(params)
      return result
    } catch (error) {
      console.log('user-error:', error)
    }
  }

  async login (params): Promise<{ error: any; data: any; }> {
    try {
      let result = await this.Userdata.login(params)
      return result
    } catch (error) {
      console.log('user-error', error)
    }
  }
}
