const express = require('express')
const { getCar, getCars} = require('./cars.controller')
const router = express.Router()

router.get('/', getCars)
router.get('/:id', getCar)


module.exports = router