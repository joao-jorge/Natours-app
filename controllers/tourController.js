const fs = require('fs')
const tours = JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`) )

exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1
  if(id > tours.length){
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id'
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  if(!req.body.name ||!req.body.price){
    return res.status(400).json({
      status: 'failed',
      message: 'name and price no'
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route has not been programmed yet'
  })
}

exports.getTour = (req, res) => {
  const tour = tours.find(el => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

exports.deleteTour = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route has not been programmed yet'
  })
}