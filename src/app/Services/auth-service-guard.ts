import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SGestionusuarios } from './usuarios-service'; // Inyectamos servicio usuarios

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(SGestionusuarios); // Inyectamos servicio usuarios
  const router = inject(Router); // Inyectamos el router para redirigir

  if (userService.usuario != null) {
    return true; // El usuario está registrado, lo dejamos pasar
  } else {
    // No está registrado: lo mandamos a la home (o donde tengas tu modal/login)
    alert('No tenés permisos para acceder a esta sección. Iniciá sesión primero.');
    router.navigate(['/home']); 
    return false; // Bloqueamos el acceso
  }
};