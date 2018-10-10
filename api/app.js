'use strict'

const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//TODO: Configure routes
var userRoutes = require('./routes/user')
var vehiculoRoutes = require('./routes/vehiculo')
var configRoutes = require('./routes/config')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  
    next()
})

// TODO: Configure base routes
app.use('/api', userRoutes)
app.use('/api', vehiculoRoutes)
app.use('/api', configRoutes)

module.exports = app