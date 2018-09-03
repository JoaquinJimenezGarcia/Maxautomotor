import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { InicioComponent } from './components/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreNosotrosComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent, SobreNosotrosComponent, InicioComponent]
})
export class AppModule { }
