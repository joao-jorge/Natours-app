const express = require('express')
const morgan = require('morgan')
const app = express()

//middlewares
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app