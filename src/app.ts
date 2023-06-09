import Koa from 'koa'
import Router from 'koa-router'
import { config } from './config/mysql/index'
import Redis from 'ioredis'
import mysql from 'mysql'
import { querry } from './config/mysql/index'

const app = new Koa()

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
})

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

const router = new Router()

router.get('/', async (ctx: { body: string }, next: any) => {
  const redisData = await redis.get('myKey')
  const data = await querry('select * from users')
  if (redisData) {
    const a = 123
    console.log(redisData, 'redisDatad')
  } else {
    void redis.set('myKey', 222)
  }
  console.log(redisData, 'redisData', data)
  ctx.body = 'hello KOAaa'
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('listen 3000 OK')
})
