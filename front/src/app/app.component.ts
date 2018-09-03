import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './models/vehiculo';
import { VehiculoServices } from './services/vehiculo.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VehiculoServices]
})

export class AppComponent implements OnInit {
  title = 'Destacados';

  constructor(private router: Router) {
  }

  ngOnInit() {
    
  }
}
