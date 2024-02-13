import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const database = {}
export default database
let connectionTries = 0
connectDatabase()

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  genid: String
})

const snippetSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  tags: [String],
  owner: String
})

const User = mongoose.model('User', userSchema)
const Snippet = mongoose.model('Snippet', snippetSchema)

/**
 * Check if user exists in database
 *
 * @param {*} username username
 * @param {*} password password (optional)
 * @returns {boolean} true if user exists
 */
database.lookUpUser = async (username, password = undefined) => {
  const user = await User.findOne({ username })
  if (user === null) {
    return false
  } else if (password === undefined) {
    return true
  } else if (bcrypt.compareSync(password, user.password)) {
    return user
  }
}

/**
 * Register user in database
 *
 * @param {string} username required
 * @param {string} password required
 * @returns {boolean} true if user was registered
 */
database.registerUser = async (username, password) => {
  password = bcrypt.hashSync(password, 10)
  const user = new User({ username, password, genid: generateUUID() })
  user.save()
  return true
}

/**
 * Connects to database
 *
 */
async function connectDatabase () {
  try {
    database.mongoose = await mongoose.connect('mongodb+srv://rynosuki:xxx@crud-robin.qhlgmni.mongodb.net/CRUD')
    // database.mongoose = await mongoose.connect('mongodb://127.0.0.1:27017')
    console.log('\x1b[32mConnected to database\x1b[0m')
  } catch (error) {
    console.log('\x1b[31mFailed to connect to database\x1b[0m')
    if (connectionTries++ > 3) {
      console.log('\x1b[31mFailed to connect to database 3 times, closing server.\x1b[0m')
    }
    console.log('\x1b[31mRetrying in 5 seconds\x1b[0m')
    setTimeout(connectDatabase, 5000)
  }
}

/**
 * Generates a UUID
 *
 * @returns {string} UUID
 */
function generateUUID () {
  let d = new Date().getTime()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

/**
 * Add code snippet to database
 *
 * @param {*} title - title of snippet
 * @param {*} description - description of snippet
 * @param {*} code - code of snippet
 * @param {*} tags - tags of snippet
 * @param {*} owner - owner of snippet
 * @returns {boolean} true if snippet was added
 */
database.addCodeSnippet = (title, description, code, tags, owner) => {
  const snippet = new Snippet({ title, description, code, tags, owner })
  snippet.save()
  return true
}

/**
 * Get code snippets from database
 *
 * @param {*} id - id of snippet
 * @returns {Array} array of snippets
 */
database.getCodeSnippets = async (id) => {
  if (id === 0) {
    return await Snippet.find()
  } else {
    return await Snippet.findOne({ _id: id })
  }
}

/**
 * Delete code snippet from database
 *
 * @param {*} id - id of snippet
 * @returns {boolean} true if snippet was deleted
 */
database.deleteCodeSnippet = async (id) => {
  console.log(id)
  Snippet.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err)
      return false
    }
  })
  return true
}

/**
 * Edit code snippet in database
 *
 * @param {*} id - id of snippet
 * @param {*} title - title of snippet
 * @param {*} description - description of snippet
 * @param {*} code - code of snippet
 * @param {*} tags - tags of snippet
 * @returns {boolean} true if snippet was edited
 */
database.editCodeSnippet = async (id, title, description, code, tags) => {
  Snippet.updateOne({ _id: id }, { title, description, code, tags }, (err) => {
    if (err) {
      console.log(err)
      return false
    }
  }
  )
  return true
}
