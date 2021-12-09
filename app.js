const express = require('express')
const fs = require('fs')

const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) )
const app = express()
app.use(express.json())
const port = 3000

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({id: newId}, req.body)
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

const updateTour = (req, res) => {

}

const getTour = (req, res) => {
  const id = req.params.id * 1
  if(id > tours.length){
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id'
    })
  }
  const tour = tours.find(el => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const deleteTour = (req, res) => {

}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

//app.post('/api/v1/tours', createTour)
//app.get('/api/v1/tours', getAllTours)
//app.get('/api/v1/tours/:id', getTour)
//app.put('/api/v1/tours/:id', updateTour)
//app.delete('/api/v1/tours/:id', deleteTour)

const tourRouter = express.Router()
const userRouter = express.Router()




tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour)

tourRouter
  .route('/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour)

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})