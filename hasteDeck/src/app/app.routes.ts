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
  {
    path: 'buscar-eventos',
    loadComponent: () => import('./buscar-eventos/buscar-eventos.page').then( m => m.BuscarEventosPage)
  },
  {
    path: 'crear-eventos',
    loadComponent: () => import('./crear-eventos/crear-eventos.page').then( m => m.CrearEventosPage)
  },
  {
    path: 'crear-perfil',
    loadComponent: () => import('./crear-perfil/crear-perfil.page').then( m => m.CrearPerfilPage)
  },
];




