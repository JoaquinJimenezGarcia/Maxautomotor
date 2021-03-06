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

function obtenerVehiculo(req, res){
    var cocheId = req.params.id;

    Vehiculo.find({_id: cocheId}).populate({path: 'svehiculo'}).exec((err, vehiculo)=> {
        if(err) {
            res.status(500).send({message: 'Error trying to get the page.'})
        } else {
            if(!vehiculo) {
                res.status(404).send({message: 'The page doesnt exist.'})
            } else {
                res.status(200).send({vehiculo: vehiculo})
            }
        }
    })
}

function subirFoto(req, res) {
    var cocheId = req.params.id;
    var file_name = 'No subido...';

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        console.log(file_name);
        Vehiculo.findByIdAndUpdate(cocheId, {image: file_name}, (err, vehiculoUpdated) => {
            if(!vehiculoUpdated){
                res.status(404).send({message: 'No se ha podido subir la foto'});
            } else {
                res.status(200).send({vehiculo: vehiculoUpdated});
            }
        });
    } else {
        res.status(404).send({message: 'No se ha subido imagen.'})
    }
}

function obtenerFoto(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/coches/'+imageFile;

    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({message: 'No existe la imagen.'})
        }
    });
}

function marcarComoReservado(req, res) {
    var vehiculoId = req.params.id
    req.body.reservado = 1
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function marcarComoNoReservado(req, res) {
    var vehiculoId = req.params.id
    req.body.reservado = 0
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function marcarComoVendido(req, res) {
    var vehiculoId = req.params.id
    req.body.vendido = 1
    req.body.oferta = 0
    req.body.disponibilidad = 0
    req.reservado = 0
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function marcarComoNoVendido(req, res) {
    var vehiculoId = req.params.id
    req.body.vendido = 0
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function ponerEnOferta(req, res) {
    var vehiculoId = req.params.id
    req.body.oferta = 1
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function quitarEnOferta(req, res) {
    console.log(req.body);
    var vehiculoId = req.params.id
    req.body.oferta = 0
    req.body.precioOferta = 0
    var update = req.body

    actualizarVehiculo(vehiculoId, update, res);
}

function actualizarVehiculo(id, update, res) {
    Vehiculo.findByIdAndUpdate(id, update, (err, vehiculoUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando el vehículo.'})
        } else {
            if(!vehiculoUpdated) {
                res.status(404).send({message: 'Internal error updating the vehiculo.'})
            } else {
                console.log('Actualiza');
                res.status(200).send({vehiculo: vehiculoUpdated})
            }
        }
    })
}

function marcarComoDisponible(req, res) {
    var vehiculoId = req.params.id
    req.body.disponibilidad = 1
    var update = req.body

    Vehiculo.findByIdAndUpdate(vehiculoId, update, (err, vehiculoUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando el vehículo.'})
        } else {
            if(!vehiculoUpdated) {
                res.status(404).send({message: 'Internal error updating the vehiculo.'})
            } else {
                console.log('Actualiza');
                res.status(200).send({vehiculo: vehiculoUpdated})
            }
        }
    })
}

function marcarComoNoDisponible(req, res) {
    var vehiculoId = req.params.id
    req.body.disponibilidad = 0
    var update = req.body

    Vehiculo.findByIdAndUpdate(vehiculoId, update, (err, vehiculoUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando el vehículo.'})
        } else {
            if(!vehiculoUpdated) {
                res.status(404).send({message: 'Internal error updating the vehiculo.'})
            } else {
                console.log('Actualiza');
                res.status(200).send({vehiculo: vehiculoUpdated})
            }
        }
    })
}

function agregar(req, res){
    var vehiculo = new Vehiculo()
    var params = req.body
    var file_name 

    console.log('Req file:');
    console.log(req.file);

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        file_name = file_split[2];

        console.log(file_name);
    } else {
        console.log('Error subiendo la imagen');
        //res.status(404).send({message: 'No se ha subido imagen.'})
    }

    console.log('Construye el objeto');

    vehiculo.modelo = params.modelo
    vehiculo.marca = params.marca
    vehiculo.disponibilidad = params.disponibilidad
    vehiculo.descripcion = params.descripcion
    vehiculo.precio = params.precio
    vehiculo.image = params.image
    vehiculo.imageUno = params.imageUno
    vehiculo.imageDos = params.imageDos
    vehiculo.imageTres = params.imageTres
    vehiculo.imageCuatro = params.imageCuatro
    vehiculo.imageCinco = params.imageCinco
    vehiculo.reservado = params.reservado
    vehiculo.vendido = params.vendido
    vehiculo.precioOferta = vehiculo.precio
    vehiculo.caracteristicas = params.caracteristicas

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
  obtenerVehiculo,
  actualizar,
  borrar,
  marcarComoDisponible,
  marcarComoNoDisponible,
  subirFoto,
  obtenerFoto,
  ponerEnOferta,
  quitarEnOferta,
  marcarComoReservado,
  marcarComoNoReservado,
  marcarComoVendido,
  marcarComoNoVendido
}