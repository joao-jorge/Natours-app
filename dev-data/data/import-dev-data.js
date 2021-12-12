const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const Tour = require('./../../models/tourModel')
port = process.env.PORT

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('Connected successfuly to Database'))

// Read jsons file
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')

//import data into db
const importData = async () => {
  try{ 
    await Tour.create(tours)
    console.log('Data successfuly loaded')
    process.exit()
  } catch(err) {
    console.log(err)
    process.exit()
  }
}

// delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data deleted successfuly')
    process.exit()
  } catch(err) {
    console.log(err)
    process.exit()
  }
}

if(process.argv[2] === '--import'){
  importData()
} else if(process.argv[2] === '--delete') {
  deleteData()
}
console.log(process.argv)