const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

port = process.env.PORT

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('Connected successfuly'))

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
}) 