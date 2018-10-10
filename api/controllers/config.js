'use strict'

var Config = require('../models/config')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')

function mostrarConfig(req, res) {
    var find = Config.find({})

    find.populate({path: 'config'}).exec((err, config) => {
        if (err) {
            res.status(500).send({message: 'Error obteniendo los config.'})
        } else {
            if(!config) {
                res.status(404).send({message: 'No hay config aún.'})
            } else {
                res.status(200).send({config})
            }
        }
    })
}

/*function agregarConfig(req, res){
    var config = new Config()
    var params = req.body

    config.sobreNosotros = params.sobreNosotros
    config.direccion = params.direccion
    config.email = params.email
    config.telefono = params.telefono

    if (config.sobreNosotros != null) {
        config.save((err, configStored) => {
            if (err) {
                console.log(err)
                res.status(500).send({message: 'Error añadiendo la config'})
            } else {
                if (!configStored) {
                    res.status(404).send({message: 'El config no ha sido añadido'})
                } else {
                    res.status(200).send({config: configStored})
                }
            }
        })
    } else {
        res.status(500).send({message: 'Missing params'})
    }
}*/

function actualizarConfig(req, res) {
    var configId = req.params.id 
    var update = req.body

    Config.findByIdAndUpdate(configId, update, (err, configUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando el config.'})
        } else {
            if(!configUpdated) {
                res.status(404).send({message: 'Internal error updating the config.'})
            } else {
                res.status(200).send({config: configUpdated})
            }
        }
    })
}

module.exports = {
    //agregarConfig,
    actualizarConfig,
    mostrarConfig
  }