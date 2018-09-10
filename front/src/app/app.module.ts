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
import { AdminCochesComponent } from './components/admin-coches.component';
import { AdminCocheComponent } from './components/admin-coche.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreNosotrosComponent,
    InicioComponent,
    CochesComponent,
    AdminLoginComponent,
    AdminCochesComponent,
    AdminCocheComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [
    AppComponent, 
    SobreNosotrosComponent, 
    InicioComponent, 
    CochesComponent,
    AdminLoginComponent,
    AdminCochesComponent,
    AdminCocheComponent
  ]
})
export class AppModule { }
