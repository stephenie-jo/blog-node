import { IConnection as IConnectionClass } from './type'
import { getConnection } from './pool'
import {
  PoolConnection as IPoolConnection,
  MysqlError as IMysqlError
} from 'mysql'

interface formatValue {
  counts?: number
  error: any | IMysqlError
  data: any
}

interface reportItem {
  db: string,
  orgTable: string
}

/**
 * @description Connection to wrap original connection
 *
 * @class Connection
 * @implements {IConnectionClass}
 */
class Connection implements IConnectionClass {
  private mysqlConnection: IPoolConnection
  constructor(connection: IPoolConnection) {
    this.mysqlConnection = connection
  }

  /**
   * query
   *
   * @param {string} sql
   * @returns {Promise<{ error: any; data: any }>}
   * @memberof Connection
   */
  public async query(sql: string, sqlParams?: any): Promise<formatValue> {
    return <Promise<formatValue>>new Promise(resolve => {
      this.mysqlConnection.query({
        sql,
        values: sqlParams,
        timeout: 120 * 1000
      }, (error, data, field) => {
        if (error) {
          resolve({ error, data: null })
        } else {
          resolve({ error: null, data })
        }
      })
    })
  }

  /**
   * @description release connection
   *
   * @returns
   * @memberof Connection
   */
  public release() {
    return this.mysqlConnection.destroy()
  }

  /**
   * @description rollback transaction
   *
   * @returns {Promise<formatValue>}
   * @memberof Connection
   */
  public async rollback(): Promise<formatValue> {
    return <Promise<formatValue>>new Promise(resolve => {
      return this.mysqlConnection.rollback(error => {
        if (error) {
          resolve({ error, data: null })
        }
        resolve({ error: null, data: null })
      })
    })
  }

  /**
   * commit
   *
   * @returns {Promise<formatValue>}
   * @memberof Connection
   */
  public async commit(): Promise<formatValue> {
    return <Promise<formatValue>>new Promise(resolve => {
      return this.mysqlConnection.commit(error => {
        if (error) {
          resolve({ error, data: null })
        }
        resolve({ error: null, data: null })
      })
    })
  }

  /**
   * beginTransaction
   *
   * @returns {void}
   * @memberof Connection
   */
  public async beginTransaction(): Promise<formatValue> {
    return <Promise<formatValue>>new Promise(resolve => {
      this.mysqlConnection.beginTransaction(error => {
        if (error) {
          resolve({ error, data: null })
        }
        resolve({ error: null, data: null })
      })
    })
  }

  /**
   *
   *
   * @param {any} value
   * @returns
   * @memberof Connection
   */
  public escape(value: any) {
    return this.mysqlConnection.escape(value)
  }

  /*
  *
  * @param {any} value
  * @returns
  * @memberof Connection
  */
 public streamQuery(sql: string, options: {
   onError?: (err: any) => void,
   onFields?: (fields: any) => void,
   onResult?: (row: any) => void,
   onEnd?: () => void
 }, sqlParams?: any) {
  const query = this.mysqlConnection.query({
    sql,
    values: sqlParams,
    timeout: 120 * 1000
  })
  query
    .on('error', (err) => {
      options.onError && options.onError.bind(this)(err)
    })
    .on('fields', (fields) => {
      options.onFields && options.onFields.bind(this)(fields)
    })
    .on('result', (row) => {
      options.onResult && options.onResult.bind(this)(row)
    })
    .on('end', () => {
      options.onEnd && options.onEnd.bind(this)()
    })
 }
}

async function connectBlog() {
  return new Connection(await getConnection('blog'))
}

export {
  connectBlog
}