import { connect } from "http2"

// const mariadb = require('mariadb')
const mysql = require('mysql')
export const commonConf = {
  conectionLimit: 100,
  host: '1.117.117.6',
  port: 3306,
  user: 'blog',
  password: 'root1234',
  database: 'blog'
}

export const pool = async () => {
  try {
    return await mysql.createConnection(commonConf)
  } catch (error) {
    console.log(error)
  }
}

export function getConn () {
  let db = null
  if (db !== null) {
    db.destory()
    db = null
  }
  db = mysql.createConnection(commonConf)
  db.getConnection()
  return db
}