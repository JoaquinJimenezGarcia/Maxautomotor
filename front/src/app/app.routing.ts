import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importar componentes del usuario
import { SobreNosotrosComponent } from './components/sobre-nosotros.component';
import { InicioComponent } from './components/inicio.component';
import { CochesComponent } from './components/coches.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminCochesComponent } from './components/admin-coches.component';
import { AdminCocheComponent } from './components/admin-coche.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'index', component: InicioComponent},
    {path: 'sobre-nosotros', component: SobreNosotrosComponent},
    {path: 'coches', component: CochesComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'admin-coches', component: AdminCochesComponent},
    {path: 'admin-coche', component: AdminCocheComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);