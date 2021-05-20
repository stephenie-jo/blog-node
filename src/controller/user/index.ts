import UserService from '../../service/user/index'

class User {
  private service: UserService = new UserService()

  register = async ctx => {
    try {
      const result = await this.service.addUser(ctx.query)
      console.log('test:>result', result)
      if (result.error) {
        return ctx.body = {
          __errMsg: result.error || '用户名已存在'
        }
      }
      return ctx.body = result
    } catch (error) {
      console.log('error', error)
    }
  }

  login = async ctx => {
    try {
      const result = await this.service.login(ctx.query)
      if (result.error) {
        return ctx.body = {
          __errMsg: result.error || '用户名或密码错误'
        }
      }
      return ctx.body = result
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default new User()
