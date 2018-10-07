import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServices } from '../services/usuario.services';
import { CochesServices } from '../services/coches.services';

@Component({
    selector: 'poner-en-oferta',
    templateUrl: '../views/poner-en-oferta.html'
})

export class PonerEnOfertaComponent implements OnInit {
    public precio: number;
    public token;
    public identity;

    constructor(private router: Router, private _usuarioService: UsuarioServices, private _cocheServices: CochesServices) {
        this.precio = 0;
    }

    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
    }

    public onSubmit() {
       /* this._cocheServices.ponerEnOferta(id, this.precio)
            .subscribe(response => {
                console.log(response);
                /*let coche = response.vehiculo;
                this.coche = coche;*/

                /*if (!coche._id) {
                    this.alertCreation = 'Error al añadir el coche';
                } else {
                    this.alertCreation = "Page created successfully";
                    this.coche = new Vehiculo('', '', '', false, '', '', 0, false);
                    this.router.navigate(["/admin-login"]);
                }*/
           /* },
                error => {
                   /* console.log('Entra en el error');
                    this.alertCreation = <any>error;

                    if (this.alertCreation != null) {
                        var body = JSON.parse(error._body);
                        this.alertCreation = body.message;
                    }*/

               /* }
            );*/
    }
}