import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CochesServices } from '../services/coches.services';
import { Vehiculo } from '../models/vehiculo';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'coches',
    templateUrl: '../views/coches-en-oferta.html',
    providers: [CochesServices]
})

export class CochesEnOfertaComponent implements OnInit {
    public coches: Vehiculo[];
    public backend: string;

    constructor(private _cocheServices: CochesServices ,private router: Router) {
        this.backend = GLOBAL.url;
    }

    ngOnInit() {
        this._cocheServices.getCoches().subscribe(
            response => {
                if(!response.vehiculos) {
                    alert('Error obteniendo los coches.');
                } else {
                    this.coches = response.vehiculos;
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }
}