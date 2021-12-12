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
      error: err.message
    })
  }
}

exports.getAllTours = async (req, res) => {
  try {
    // build query
    // 1A) Filtering
    const queryObj = {...req.query}
    const excludedFields = ['sort', 'page', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    // 1B) advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = Tour.find(JSON.parse(queryStr))

    // 2) Sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(req.query.sort)
    } else {
      query = query.sort('-createdAt')
    }

    // 3) Field limiting
    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }


    //execute query
    const tours = await query

    //send response
    res.status(201).json({
      status: 'OK',
      found: tours.length,
      data: {
        objects: tours
      }
    })
  } catch(err) {
    res.status(400).json({
      status: 'Not ok',
      error: err.message
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
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
 console.log(tour)
    res.status(200).json({
      status: 'Ok',
      data: {
        tour
      }
    })
  } catch(err) {
    res.status(400).json({
      status: 'Not ok', 
      tip: err
    })
  }
}



exports.deleteTour = async (req, res) => {
  try {
    await Tour.deleteOne({_id: req.params.id})
    res.status(204).json({
      status: 'ok',
      data: null
    })
  } catch(err) {
    res.status(400).json({
      status: 'Not ok',
      message: err
    })
  }
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