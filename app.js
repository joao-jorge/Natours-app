const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
const port = 3000

const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})