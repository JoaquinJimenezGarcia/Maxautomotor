import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-coches',
    templateUrl: '../views/admin-coches.html'
})

export class AdminCochesComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}