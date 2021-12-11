const Tour = require('./../models/tourModel')

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err
    })
  }
}

exports.getAllTours = async (req, res) => {
  try {
    const getAllTours = await Tour.find()
    res.status(201).json({
      status: 'OK',
      found: getAllTours.length,
      data: {
        objects: getAllTours
      }
    })
  } catch(err) {
    res.status(400).json({
      status: 'Not ok',
      error: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(201).json({
      status: 'ok',
      tour: tour
    })
  } catch(err) {
    res.status(400).json({
      status: 'Not Ok',
      message: 'Tour not found',
      error: err
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndupdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'Ok',
      data: {
        tour
      }
    })
  } catch(err) {

  }
}



exports.deleteTour = (req, res) => {
  
}

/* OLD CODE
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
} */