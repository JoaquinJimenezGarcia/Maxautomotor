import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importar componentes del usuario
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { InicioComponent } from './components/inicio.component';
import { CochesComponent } from './components/coches.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminCocheComponent } from './components/admin-coche.component';
import { CochesDisponiblesComponent } from './components/coches-disponibles.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'index', component: InicioComponent},
    {path: 'sobre-nosotros', component: SobreNosotrosComponent},
    {path: 'coches', component: CochesComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'admin-coche', component: AdminCocheComponent},
    {path: 'coches-disponibles', component: CochesDisponiblesComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);