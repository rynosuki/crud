import express from 'express'
import indexController from '../frontend/indexController.mjs'
import loginController from '../frontend/loginController.mjs'
import codeSnippets from '../frontend/codeSnippetsController.mjs'
import registerController from '../frontend/registerController.mjs'
import database from '../backend/databaseController.mjs'

// Create router
const router = express.Router()
export default router

// Assign database controllers
registerController.database = database
loginController.database = database

// Index page
router.get('/', indexController.page)

// Login page
router.get('/login', loginController.page)
router.post('/handle', loginController.login)

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// Codesnippets page
router.get('/codesnippets', codeSnippets.page)
router.post('/codesnippets/add', codeSnippets.add)
router.post('/codesnippets/:id/delete', codeSnippets.delete)
router.post('/codesnippets/:id/edit', codeSnippets.edit)
router.post('/codesnippets/:id/update', codeSnippets.update)

// Register page
router.get('/register', registerController.page)
router.post('/submitregister', registerController.register)

router.get('*', (req, res) => {
  res.status(404).render('404')
})
