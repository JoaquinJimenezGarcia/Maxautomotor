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
api.get('/vehiculo/:id', VehiculoController.obtenerVehiculo)
api.delete('/eliminar-vehiculo/:id', md_auth.ensureAuth, VehiculoController.borrar)
api.put('/marcar-disponible/:id', VehiculoController.marcarComoDisponible)
api.put('/marcar-nodisponible/:id', VehiculoController.marcarComoNoDisponible)
api.post('/subir-foto/:id', [md_auth.ensureAuth, md_upload], VehiculoController.subirFoto)
api.get('/obtener-foto/:imageFile', VehiculoController.obtenerFoto)
api.put('/marcar-reservado/:id', VehiculoController.marcarComoReservado)
api.put('/marcar-no-reservado/:id', VehiculoController.marcarComoNoReservado)
api.put('/marcar-vendido/:id', VehiculoController.marcarComoVendido)
api.put('/marcar-no-vendido/:id', VehiculoController.marcarComoNoVendido)
api.put('/poner-en-oferta/:id', VehiculoController.ponerEnOferta)
api.put('/quitar-en-oferta/:id', VehiculoController.quitarEnOferta)

module.exports = api