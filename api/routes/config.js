'use strict'

const express = require('express')
var ConfigController = require ('../controllers/config')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var md_upload = multipart({uploadDir: './uploads/users'})

api.post('/crear-config',md_auth.ensureAuth, ConfigController.agregarConfig)
api.put('/actualizar-config/:id',md_auth.ensureAuth, ConfigController.actualizarConfig)
api.get('/mostrar-config', ConfigController.mostrarConfig)

module.exports = api