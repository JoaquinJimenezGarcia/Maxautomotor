import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from '../models/vehiculo';
import { UsuarioServices } from '../services/usuario.services';

@Component({
    selector: 'admin-coche',
    templateUrl: '../views/admin-coche.html'
})

export class AdminCocheComponent implements OnInit {
    public identity;
    public token;
    public coche: Vehiculo;

    constructor(private router: Router, private _usuarioService: UsuarioServices) {
        this.coche = new Vehiculo('', '', '', false, [''], '', 0);
    }

    ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
    }
}