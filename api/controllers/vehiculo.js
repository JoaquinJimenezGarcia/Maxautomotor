'use strict'

var Vehiculo = require('../models/vehiculo')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')

function obtenerVehiculos(req, res) {
    var find = Vehiculo.find({})

    find.populate({path: 'vehiculo'}).exec((err, vehiculos) => {
        if (err) {
            res.status(500).send({message: 'Error obteniendo los vehículos.'})
        } else {
            if(!vehiculos) {
                res.status(404).send({message: 'No hay vehículos aún.'})
            } else {
                res.status(200).send({vehiculos})
            }
        }
    })
}

function agregar(req, res){
    var vehiculo = new Vehiculo()
    var params = req.body

    vehiculo.modelo = params.modelo
    vehiculo.marca = params.marca
    vehiculo.disponibilidad = params.disponibilidad

    if (vehiculo.modelo != null) {
        vehiculo.save((err, vehiculoStored) => {
            if (err) {
                console.log(err)
                res.status(500).send({message: 'Error añadiendo el vehículo'})
            } else {
                if (!vehiculoStored) {
                    res.status(404).send({message: 'El vehículo no ha sido añadido'})
                } else {
                    res.status(200).send({vehiculo: vehiculoStored})
                }
            }
        })
    } else {
        res.status(500).send({message: 'Missing params'})
    }
}

function actualizar(req, res) {
    var vehiculoId = req.params.id 
    var update = req.body

    Vehiculo.findByIdAndUpdate(vehiculoId, update, (err, vehiculoUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando el vehículo.'})
        } else {
            if(!vehiculoUpdated) {
                res.status(404).send({message: 'Internal error updating the vehiculo.'})
            } else {
                res.status(200).send({vehiculo: vehiculoUpdated})
            }
        }
    })
}

function borrar(req, res) {
    var vehiculoId = req.params.id;

    Vehiculo.find({_id: vehiculoId}).remove((err, vehiculoRemoved) => {
        if(err) {
            res.status(500).send({message: 'Error borrando el vehículo.'})
        } else {
            if (!vehiculoRemoved) {
                res.status(404).send({message: 'El vehículo no ha sido borrado.'})
            } else {
                res.status(200).send({vehiculo: vehiculoRemoved})
            }
        }
    })
}

module.exports = {
  agregar,
  obtenerVehiculos,
  actualizar,
  borrar
}