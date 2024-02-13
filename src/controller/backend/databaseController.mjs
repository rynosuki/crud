import databaseModel from '../../model/databaseModel.mjs'

const database = {}
export default database

database.model = databaseModel

/**
 * Check if user exists in database and register if not
 *
 * @param {string} username username
 * @param {string} password raw password
 * @returns {boolean} true if user was registered
 */
database.registerUser = async (username, password) => {
  return await database.model.lookUpUser(username) ? false : database.model.registerUser(username, password)
}

/**
 * Check if user exists in database and login if so
 *
 * @param {string} username username
 * @param {string} password raw password
 * @param {object} req request
 * @returns {boolean} true if user exists and password is correct
 */
database.loginUser = async (username, password, req) => {
  const user = await database.model.lookUpUser(username, password)
  if (Object.keys(user).length > 0) {
    req.session.genid = user.genid
    return true
  }
}

/**
 * Check if user is logged in
 *
 * @param {*} title - title of code snippet
 * @param {*} description - description of code snippet
 * @param {*} code - code snippet
 * @param {*} tags - tags of code snippet
 * @param {*} owner - owner of code snippet
 * @returns {boolean} true if user is logged in
 */
database.addCodeSnippet = async (title, description, code, tags, owner) => {
  return await database.model.addCodeSnippet(title, description, code, tags, owner)
}

/**
 * Get all code snippets
 *
 * @param {*} id - id of code snippet
 * @returns {Array} array of code snippets
 */
database.getCodeSnippets = async (id) => {
  return await database.model.getCodeSnippets(id)
}

/**
 * Delete code snippet by id
 *
 * @param {*} id - id of code snippet
 * @returns {object} code snippet
 */
database.deleteCodeSnippet = async (id) => {
  return await database.model.deleteCodeSnippet(id)
}

/**
 * Edit code snippet by id
 *
 * @param {*} id - id of code snippet
 * @param {*} title - title of code snippet
 * @param {*} description - description of code snippet
 * @param {*} code - code snippet
 * @param {*} tags - tags of code snippet
 * @returns {object} code snippet
 */
database.editCodeSnippet = async (id, title, description, code, tags) => {
  return await database.model.editCodeSnippet(id, title, description, code, tags)
}
