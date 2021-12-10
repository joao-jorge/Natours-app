const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

port = process.env.PORT

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('Connected successfuly to Database'))

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  }, 
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})

const Tour = mongoose.model('Tour', tourSchema)
const testTour = new Tour({
  name: 'Fugir ao Maroocos',
  rating: 4.8,
  price: 345.4
})

testTour
  .save()
  .then((doc) => {console.log(doc)})
  .catch(err => console.log('Error :', err))

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
}) 