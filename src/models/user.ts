import { pool, getConn } from '../configs/mysql'
import { IUser } from '../types/user'
class User {
  // 新增
  public async addUser(param: IUser): Promise<{
    error: any
    data: Array<IUser>
    message?: string
  }> {
    const connection = await getConn()
    try {
      const { user_name, pass_word } = param
      const user = await connection.query(`select * from user where user_name = '${user_name}'`)
      console.log('test:>person', user)
      if (user.error) {
        throw user.error
      }
      if (user.data) {
        return {
          error: '用户名已存在',
          data: null,
          message: ''
        }
      }

    //   const res = await connection.query(`insert into user (user_name, pass_word) values ('${user_name}', '${pass_word}')`)
    //   if (res.error) {
    //     throw res.error
    //   }
    //   return {
    //     error: null,
    //     data: res.data || null
    //   }
    // } catch (error) {
    //   return {
    //     error,
    //     data: null,
    //     message: '新增失败'
    //   }
    } finally {
      connection.end()
    }
  }

  public async login(params: IUser): Promise<{
    error: any
    data: any
    message?: string
  }> {
    const connection = await pool()
    try {
      const { user_name, pass_word } = params
      const res = await connection.query(`select * from user where user_name = '${user_name}' and pass_word = '${pass_word}'`)
      
      // if (res.error) {
      //   throw res.error
      // }
      // if (res.length === 0) {
      //   return {
      //     error: '用户名或密码错误',
      //     data: null
      //   }
      // }
      return {
        error: null,
        data: null
      }
    } catch (error) {
      return {
        error,
        data: null,
        message: '登录失败'
      }
    } finally {
      connection.end()
    }
  }
}

export { User }
