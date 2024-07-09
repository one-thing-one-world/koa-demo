import Koa from 'koa'
import Router from 'koa-router'
import { config } from './config/mysql/index'
import Redis from 'ioredis'
import mysql from 'mysql'
import { querry } from './config/mysql/index'
import session from 'koa-session'
import passport from './config/googleAuth2/index'
const app = new Koa()
import cors from 'koa2-cors'
// import './config/googleAuth2/index'
// const redis = new Redis({
//   port: 6379,
//   host: '127.0.0.1',
// })
// 12345
// const pool = mysql.createPool({
//   host: config.database.HOST,
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
// })

const router = new Router()
app.use(async (ctx, next) => {
  // Log the request method, URL, and headers
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  // console.log(ctx.request.headers)

  await next()
})

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
  console.log(123)
  ctx.body = 'hello KOAaa'
})

// ===>

app.keys = ['koa.sess']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }), function (ctx) {
  console.log(ctx, 'callbackctx/auth/google')
})

router.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    {
      successRedirect: '/login',
      failureRedirect: '/login',
    },
    function (ctx) {
      console.log(ctx, 'router.get/callbackctx/auth/google')
    }
  )
)

// ===>
app.use(cors())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listen at: http://localhost:3000')
})
