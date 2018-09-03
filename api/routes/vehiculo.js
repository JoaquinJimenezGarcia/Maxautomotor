'use strict'

const express = require('express')
var VehiculoController = require ('../controllers/vehiculo')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')

api.post('/agregar-vehiculo', md_auth.ensureAuth, VehiculoController.agregar)
api.put('/actualizar-vehiculo/:id', md_auth.ensureAuth, VehiculoController.actualizar)
api.get('/vehiculos/', md_auth.ensureAuth, VehiculoController.obtenerVehiculos)
api.delete('/eliminar-vehiculo/:id', md_auth.ensureAuth, VehiculoController.borrar)

module.exports = api