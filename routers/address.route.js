const express = require ('express')

const routes = express.Router()

const addAddress = require('../controllers/address.controller')

routes.post('/addAddress' , addAddress)

module.exports = routes