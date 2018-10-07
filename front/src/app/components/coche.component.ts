import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CochesServices } from '../services/coches.services';
import { Vehiculo } from '../models/vehiculo';

@Component({
    selector: 'coches',
    templateUrl: '../views/coche.html',
    providers: [CochesServices]
})

export class CocheComponent implements OnInit {
    public coches: Vehiculo;
    public url = '';
    public href: string = "";
    public id: string;
    public coche: Vehiculo;

    constructor(private _cocheServices: CochesServices ,private router: Router) {
        this.href = this.router.url;
        this.url = this.href.replace('/','');
        this.id = this.url.split('/')[1];

        this.coche = new Vehiculo('', '', '', false, '', '', 0, false, false, false, 0, '');
    }

    ngOnInit() {
        this._cocheServices.getCoche(this.id).subscribe(
            response => {
                console.log(response);
                if(!response.vehiculo) {
                    alert('Error obteniendo el coche.');
                } else {
                    this.coche = response.vehiculo;
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );
    }
}