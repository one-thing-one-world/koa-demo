import mysql from "mysql"

export const config = {
  port: 3000,
  database: {
    DATABASE: "jinshan",
    USERNAME: "liujuncai",
    PASSWORD: "liujuncai",
    PORT: "3306",
    HOST: "localhost",
  },
}

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

export const querry = (sqls: any, sqlParams: any[] = [undefined]) =>
  new Promise((res, rej) =>
    pool.getConnection((err, connection) => {
      // if (err) rej(err) // not connected!
      if (err) throw err
      // Use the connection

      connection.query(sqls, sqlParams, (error, results, fields) => {
        res(results)
        // When done with the connection, release it.
        connection.release()

        // Handle error after the release.
        if (error) rej(error)
        // if (error) throw error

        // Don't use the connection here, it has been returned to the pool.
      })
    })
  )
