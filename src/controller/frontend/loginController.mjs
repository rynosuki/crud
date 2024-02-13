const controller = {}
export default controller

/**
 * Renders login page
 *
 * @param {*} req - incoming request
 * @param {*} res - outgoing response
 */
controller.page = (req, res) => {
  if (req.session.username) res.redirect('codesnippets')
  res.render('login', { locals: res.locals })
}

/**
 * Logs in user
 *
 * @param {*} req - incoming request
 * @param {*} res - outgoing response
 */
controller.login = async (req, res) => {
  const { username, password } = req.body
  const success = await controller.database.loginUser(username, password, req)
  if (success) {
    req.session.username = username
    res.redirect('codesnippets')
  } else {
    res.session.flash = 'Invalid username or password'
    res.redirect('login')
  }
}
