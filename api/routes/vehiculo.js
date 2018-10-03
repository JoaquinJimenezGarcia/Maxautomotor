'use strict'

const express = require('express')
var VehiculoController = require ('../controllers/vehiculo')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/coches'});

api.post('/agregar-vehiculo', [md_auth.ensureAuth, md_upload], VehiculoController.agregar)
api.put('/actualizar-vehiculo/:id', md_auth.ensureAuth, VehiculoController.actualizar)
api.get('/vehiculos', VehiculoController.obtenerVehiculos)
api.delete('/eliminar-vehiculo/:id', md_auth.ensureAuth, VehiculoController.borrar)
api.put('/marcar-disponible/:id', VehiculoController.marcarComoDisponible)
api.put('/marcar-nodisponible/:id', VehiculoController.marcarComoNoDisponible)
api.post('/subir-foto/:id', [md_auth.ensureAuth, md_upload], VehiculoController.subirFoto)

module.exports = api