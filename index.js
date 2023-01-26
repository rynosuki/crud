import express from 'express'
import mongoose from 'mongoose'
import getHTML from './path/form/index.js'
import bodyParser from 'body-parser'
const app = express()

main().catch(err => console.log(err))
const User = mongoose.model('User', { username: String, password: String, rights: Number })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crud')
  console.log('Connected to database')
  if ((await User.find({ username: 'ryno' })).length === 0) {
    const newUser = new User({
      username: 'ryno',
      password: 'poop',
      rights: 1
    })
    await newUser.save()
    console.log('Added new user')
  }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8000, () => {
  console.log('Server started on port 8000')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/*', (req, res) => {
  if (req.path === '/form') {
    res.send(getHTML())
  }
})

app.post('/*', async (req, res) => {
  if (req.path === '/home') {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const checkUser = await User.find({ username: username , password: password })
    if (checkUser.length === 0) {
      res.send('Wrong username or password')
    } else {
      res.send('Welcome ' + username + '!')
    }
  }
})