import mysql from 'mysql'
import { commonConf } from './mysql'
import { PoolConnection as IPoolConnection } from 'mysql'

const poolCluster = mysql.createPoolCluster()

export async function getConnection (db_name: string) {
  
  try {
    const conInfo = commonConf
    let connection = await connect(db_name)
  
    if (connection)  {
      return connection
  
    } else {
      if (conInfo && conInfo[db_name]) {
        poolCluster.add(db_name, conInfo[db_name])
        connection = await connect(db_name)
      }
      if (connection) {
        return connection
      } else {
        throw new Error('生成数据库连接connection失败')
      }
    }
  } catch (err) {
    
  }

  async function connect (name: string) {
    return <Promise<IPoolConnection>>new Promise(resolve => {
      poolCluster.getConnection(name, (error, connection) => {
        if (error) {
          resolve(null)
        }
        resolve(connection)
      })
    })
  }
  
}
