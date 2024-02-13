const controller = {}
export default controller

/**
 * Renders index page
 *
 * @param {*} req - incoming request
 * @param {*} res - outgoing response
 */
controller.page = (req, res) => {
  res.render('index', { locals: res.locals })
}
