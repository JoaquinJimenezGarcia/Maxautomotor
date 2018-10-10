'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var ConfigSchema = Schema({
    sobreNosotros: String,
    direccion: String,
    email: String,
    telefono: String
})

module.exports = mongoose.model('Config', ConfigSchema)