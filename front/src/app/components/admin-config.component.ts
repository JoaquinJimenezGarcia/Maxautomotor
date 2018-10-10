import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigServices } from '../services/config.services';
import { UsuarioServices } from '../services/usuario.services';
import { Config } from '../models/config';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'coches',
    templateUrl: '../views/admin-config.html',
    providers: [ConfigServices]
})

export class AdminConfig implements OnInit {
    public config: Config;
    public id: string;
    public identity;
    public token;

    constructor(private _usuarioService: UsuarioServices, private _configServices: ConfigServices ,private router: Router) {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.cargarConfig();
    }

    ngOnInit() {
    }

    cargarConfig() {
        this._configServices.mostrarConfig().subscribe(
            response => {
                if(!response.config) {
                    alert('Error obteniendo el coche.');
                } else {
                    this.config = new Config(
                        response.config[0]._id,
                        response.config[0].sobreNosotros,
                        response.config[0].direccion,
                        response.config[0].email,
                        response.config[0].telefono,
                    )
                }

                console.log(this.config);
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }

    public onSubmit() {
        this._configServices.actualizaConfig(this.config).subscribe(
            response => {
                    if(response.config) {
                        alert('Modificado correctamente!');
                    }
                },
            error => {
                console.log(error._body);
                    alert('Ha ocurrido un error inesperado actualizando su configuración.');
                }
            );
    }
}