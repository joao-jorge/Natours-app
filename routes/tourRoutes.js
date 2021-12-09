
const express = require('express')
const router = express.Router()
const fs = require('fs')
const tours = JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`) )

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

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour)

module.exports = router
