import Koa from 'koa'
import Router from 'koa-router'
import { config } from './config/mysql/index'
import Redis from 'ioredis'
import mysql from 'mysql'
import { querry } from './config/mysql/index'
import session from 'koa-session'
import passport from 'koa-passport'
const app = new Koa()

import './config/googleAuth2/index'
// const redis = new Redis({
//   port: 6379,
//   host: '127.0.0.1',
// })

// const pool = mysql.createPool({
//   host: config.database.HOST,
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
// })

const router = new Router()

router.get('/', async (ctx: { body: string }, next: any) => {
  // const redisData = await redis.get('myKey')
  // const data = await querry('select * from users')
  // if (redisData) {
  //   const a = 123
  //   console.log(redisData, 'redisDatad')
  // } else {
  //   void redis.set('myKey', 222)
  // }
  // console.log(redisData, 'redisData', data)
  ctx.body = 'hello KOAaa'
})

// ===>

app.keys = ['your-session-secret']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (ctx) {
  // Successful authentication, redirect home.
  ctx.redirect('/')
})

// ===>

app.use(router.routes())
app.listen(3000, () => {
  console.log('listen 3000 OK')
})
