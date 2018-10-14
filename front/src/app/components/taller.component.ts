import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../models/config';

@Component({
    selector: 'taller',
    templateUrl: '../views/taller.html'
})

export class TallerComponent implements OnInit {
    public config: Config[];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}