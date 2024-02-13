const controller = {}
export default controller

/**
 * Renders register page
 *
 * @param {*} req incoming request
 * @param {*} res outgoing response
 */
controller.page = (req, res) => {
  res.render('register', { locals: res.locals })
}

/**
 * Uses data in request to register user
 *
 * @param {*} req incoming request
 * @param {*} res outgoing response
 * @returns {*} redirects to codesnippets page
 */
controller.register = async (req, res) => {
  const { username, password, password2 } = req.body
  if (password !== password2) {
    res.session.flash = 'Passwords do not match'
    res.redirect('register')
    return
  }
  const freeName = await controller.database.registerUser(username, password)
  if (freeName) {
    req.session.username = username
    await controller.database.loginUser(username, password, req)
    res.redirect('codesnippets')
  } else {
    res.session.flash = 'Username already exists / invalid'
    res.redirect('register')
  }
}
