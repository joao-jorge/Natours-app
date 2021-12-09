const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))


const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app