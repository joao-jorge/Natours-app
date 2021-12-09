const express = require('express')
const routes = express.Router()
const userRoutes = require('./../controllers/userController')

routes
  .route('/')
  .get(userRoutes.getAllUsers)
  .post(userRoutes.createUser)

routes
  .route('/:id')
  .get(userRoutes.getUser)
  .put(userRoutes.updateUser)
  .delete(userRoutes.deleteUser)

module.exports = routes
