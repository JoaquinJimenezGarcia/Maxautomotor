import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './models/vehiculo';
import { CochesServices } from './services/coches.services';
import { UsuarioServices } from './services/usuario.services';
import { ConfigServices } from './services/config.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CochesServices, UsuarioServices, ConfigServices]
})

export class AppComponent implements OnInit {
  title = 'Destacados';

  constructor(private router: Router) {
  }

  ngOnInit() {
    
  }
}
