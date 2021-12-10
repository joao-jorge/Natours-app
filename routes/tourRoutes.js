const express = require('express')
const router = express.Router()
const tourController = require('./../controllers/tourController')

//router
// .param('id', tourController.checkID)



router
  .route('/')
  .post(tourController.createTour)
  .get(tourController.getAllTours)
  

router
  .route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router

