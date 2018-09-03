'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var VehiculoSchema = Schema({
    modelo: String,
    marca: String,
    disponibilidad: Boolean,
    fotos: [String]
})

module.exports = mongoose.model('Vehiculo', VehiculoSchema)