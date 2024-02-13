import Express from 'express'
import Logger from 'morgan'
import userRoute from './userRoute.mjs'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const app = Express()
app.set('view engine', 'ejs')
app.set('trust proxy', 1)

app.use(Logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'rynosuki',
  saveUninitialized: true,
  cookie: { secure: false },
  name: 'sessionData'
}))
app.use((req, res, next) => {
  if (req.session) {
    res.session = req.session
    res.locals.username = req.session.username
    res.locals.genid = req.session.genid
    res.locals.flash = req.session.flash
  }
  req.session.flash = null
  next()
})
app.use((req, res, next) => {
  if (req.body.owner_id && req.session.genid !== req.body.owner_id) {
    res.status(403).render('403')
    return
  }
  next()
})
app.use('/public', Express.static('public'))
app.use(cookieParser())

app.use('/', userRoute)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('500')
})

export default (port = 3000) => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}
