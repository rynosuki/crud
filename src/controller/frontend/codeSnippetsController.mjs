import database from '../backend/databaseController.mjs'

const controller = {}
export default controller

controller.database = database

/**
 * Requests rendering of codesnippets page
 *
 * @param {*} req incoming request
 * @param {*} res outgoing response
 */
controller.page = async (req, res) => {
  console.log(res.locals);
  res.render('codesnippets', { locals: res.locals, snippets: await controller.database.getCodeSnippets(0) })
}

/**
 * Adds a new code snippet to the database
 *
 * @param {*} req - incoming request
 * @param {*} res - outgoing response
 */
controller.add = (req, res) => {
  controller.database.addCodeSnippet(req.body.title, req.body.description, req.body.code, req.body.tags.split(','), req.session.genid)
  req.session.flash = 'Code snippet added'
  res.redirect('../codesnippets')
}

/**
 * Redirects to edit page
 *
 * @param {*} req - incoming request
 * @param {*} res - outgoing response
 * @returns {*} redirects to codesnippets page
 */
controller.edit = async (req, res) => {
  req.session.flash = await controller.database.getCodeSnippets(req.params.id)
  res.redirect('../')
}

controller.update = async (req, res) => {
  await controller.database.editCodeSnippet(req.params.id, req.body.title, req.body.description, req.body.code, req.body.tags.split(','))
  req.session.flash = 'Code snippet updated'
  res.redirect('../')
}

controller.delete = async (req, res) => {
  await controller.database.deleteCodeSnippet(req.params.id)
  req.session.flash = 'Code snippet deleted'
  res.redirect('../')
}
