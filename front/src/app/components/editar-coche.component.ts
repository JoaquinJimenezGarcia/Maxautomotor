import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CochesServices } from '../services/coches.services';
import { Vehiculo } from '../models/vehiculo';
import { UsuarioServices } from '../services/usuario.services';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'coches',
    templateUrl: '../views/editar-coche.html',
    providers: [CochesServices]
})

export class EditarCocheComponent implements OnInit {
    public coches: Vehiculo;
    public url = '';
    public href: string = "";
    public id: string;
    public coche: Vehiculo;
    public identity;
    public token;
    public backend: string;

    constructor(private _usuarioService: UsuarioServices, private _cocheServices: CochesServices ,private router: Router) {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.href = this.router.url;
        this.url = this.href.replace('/','');
        this.id = this.url.split('/')[1];
        this.backend = GLOBAL.url;
        this.cargarCoche();
    }

    ngOnInit() {
    }

    cargarCoche() {
        this._cocheServices.getCoche(this.id).subscribe(
            response => {
                if(!response.vehiculo) {
                    alert('Error obteniendo el coche.');
                } else {
                    this.coche = new Vehiculo(
                        response.vehiculo[0]._id,
                        response.vehiculo[0].marca,
                        response.vehiculo[0].modelo,
                        response.vehiculo[0].disponibilidad,
                        response.vehiculo[0].image,
                        response.vehiculo[0].imageUno,
                        response.vehiculo[0].imageDos,
                        response.vehiculo[0].imageTres,
                        response.vehiculo[0].imageCuatro,
                        response.vehiculo[0].imageCinco,
                        response.vehiculo[0].descripcion,
                        response.vehiculo[0].precio,
                        response.vehiculo[0].oferta,
                        response.vehiculo[0].reservado,
                        response.vehiculo[0].vendido,
                        response.vehiculo[0].precioOferta,
                        response.vehiculo[0].caracterisitcas
                    )
                }
                console.log('Esto es al iniciar');
                console.log(this.backend + 'obtener-foto/' + this.coche.image);
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }

    public onSubmit() {
        this._cocheServices.actualizaCoche(this.coche).subscribe(
            response => {
                    if(response.vehiculo) {
                        if(this.filesToUpload) {
                            console.log(this.coche._id);
                            
                            console.log('justo antes del make file request');
                            this.makeFileRequest(this.backend+'subir-foto/'+this.coche._id, [], this.filesToUpload)
                                .then(
                                    (result: any) => {
                                        console.log(result);
                                        this.coche.image = result.image;
                                        console.log('Coche listo');
                                        console.log(this.coche);
                                        alert('Actualizado con éxito');
                                        this.ngOnInit();
                                    }
                                );
                        }

                        
                    }
                },
            error => {
                    alert('Ha ocurrido un error inesperado actualizando su vehículo.');
                }
            );
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFileRequest(backend: string, params: Array<string>, files: Array<File>) {
        var token = this.token;

        return new Promise(function(resolve, reject){
            console.log('Entra al primer return');
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++) {
                console.log('Entra al for. Vuelta: ' + i);
                formData.append('image', files[i], files[i].name);
            }

            console.log('Sale del for');

            xhr.onreadystatechange = function() {
                console.log('Entra en onreadystatechange');
                console.log(xhr.readyState);
                if(xhr.readyState == 4) {
                    console.log('Entra en readystate');
                    if(xhr.status == 200) {
                        console.log('Entra en status');
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.log('Hace el reject');
                        reject(xhr.response);
                    }
                    
                }
            }
            console.log('En el open');
            xhr.open('POST', backend, true);
            console.log('En el setRequestHeader');
            xhr.setRequestHeader('Authorization', token);
            console.log('Lo envia');
            xhr.send(formData);
        });
    }
}