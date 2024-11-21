import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'admin', loadChildren: () => import('./modules/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) }

];
