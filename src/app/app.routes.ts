import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'admin', loadChildren: () => import('./modules/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
];
