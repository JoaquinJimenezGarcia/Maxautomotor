import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CochesServices } from '../services/coches.services';
import { Vehiculo } from '../models/vehiculo';

@Component({
    selector: 'coches',
    templateUrl: '../views/coches.html',
    providers: [CochesServices]
})

export class CochesComponent implements OnInit {
    public coches: Vehiculo[];

    constructor(private _cocheServices: CochesServices ,private router: Router) {
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