import { prefix } from '../../config'
import User from '../../controller/user'

const user = [
  {
    path: `${prefix}/register`,
    method: 'get',
    action: User.register
  },
  {
    path: `${prefix}/login`,
    method: 'get',
    action: User.login
  }
]

export default user