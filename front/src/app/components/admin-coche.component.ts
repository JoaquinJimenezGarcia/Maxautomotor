import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from '../models/vehiculo';
import { UsuarioServices } from '../services/usuario.services';
import { CochesServices } from '../services/coches.services';

@Component({
    selector: 'admin-coches',
    templateUrl: '../views/admin-coche.html'
})

export class AdminCocheComponent implements OnInit {
    public identity;
    public token;
    public coche: Vehiculo;
    public alertCreation;

    constructor(private router: Router, private _usuarioService: UsuarioServices, private _cocheServices: CochesServices) {
        this.coche = new Vehiculo('', '', '', false, '', '', 0);
    }

    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
    }

    public onSubmit() {
        console.log(this.coche);

        this._cocheServices.crear(this.coche)
            .subscribe(response => {
                console.log(response);
                let coche = response.vehiculo;
                this.coche = coche;

                if (!coche._id) {
                    this.alertCreation = 'Error al añadir el coche';
                } else {
                    this.alertCreation = "Page created successfully";
                    this.coche = new Vehiculo('', '', '', false, '', '', 0);
                    this.router.navigate(["/admin-login"]);
                }
            },
                error => {
                    console.log('Entra en el error');
                    this.alertCreation = <any>error;

                    if (this.alertCreation != null) {
                        var body = JSON.parse(error._body);
                        this.alertCreation = body.message;
                    }

                }
            );
    }
}