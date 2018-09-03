import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.html'
})

export class InicioComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}