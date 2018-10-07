'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var VehiculoSchema = Schema({
    modelo: String,
    marca: String,
    disponibilidad: Boolean,
    image: String,
    descripcion: String,
    precio: Number,
    oferta: Boolean,
    reservado: Boolean,
    vendido: Boolean,
    precioOferta: Number,
})

module.exports = mongoose.model('Vehiculo', VehiculoSchema)