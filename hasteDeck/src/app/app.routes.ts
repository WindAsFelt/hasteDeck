import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'opciones',
    loadComponent: () => import('./opciones/opciones.page').then( m => m.OpcionesPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'admin-crear-qr',
    loadComponent: () => import('./admin-crear-qr/admin-crear-qr.page').then( m => m.AdminCrearQrPage)
  },
];




