import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'coches',
    templateUrl: '../views/coches.html'
})

export class CochesComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}