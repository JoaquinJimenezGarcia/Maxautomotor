import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigServices } from '../services/config.services';
import { Config } from '../models/config';

@Component({
    selector: 'sobre-nosotros',
    templateUrl: '../views/sobre-nosotros.html'
})

export class SobreNosotrosComponent implements OnInit {
    public config: Config[];

    constructor(private _configServices: ConfigServices, private router: Router) {
    }

    ngOnInit() {
        this._configServices.mostrarConfig().subscribe(
            response => {
                console.log(response);
                if(!response.config) {
                    alert('Error obteniendo los coches.');
                } else {
                    this.config = response.config;
                }
            },
            error => {
                var body = JSON.parse(error._body);
                alert(body.message);
            }
        );

        console.log(this.config);
    }
}