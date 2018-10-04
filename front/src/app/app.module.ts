import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { InicioComponent } from './components/inicio.component';
import { CochesComponent } from './components/coches.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminCocheComponent } from './components/admin-coche.component';
import { CochesDisponiblesComponent } from './components/coches-disponibles.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreNosotrosComponent,
    InicioComponent,
    CochesComponent,
    AdminLoginComponent,
    AdminCocheComponent,
    CochesDisponiblesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
