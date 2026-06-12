import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SGestionusuarios {

    usuario: any = null;
    users = [
      {
        dni: '12345678',
        nombre: 'Lautaro',
        password: '1234',
        rol: 'admin'
      },
      {
        dni: '12345678',
        nombre: 'Maximiliano',
        password: '1234',
        rol: 'administradorArea'
      },
      {
        dni: '12345678',
        nombre: 'Santiago',
        password: '1234',
        rol: 'administradorResponsableComunicacion'
      }
    ]

    constructor() {
    }
    
    // Agrega el alumno al array
    addUser(user: any) {
        this.users.push(user);
    }

    // Busca el alumno a través del DNI
    getUserByDni(dni: string): any {
        return this.users.find(a => a.dni === dni) || null;
    } 
    
    // Actualiza el alumno a través del DNI
    updateUser(dni: string, updatedUser: any) {
        const index = this.users.findIndex(a => a.dni === dni);
        if (index !== -1) {
            this.users[index] = { ...updatedUser };
        }
    }

    // Borra el alumno a través del DNI
    deleteUser(dni: string) {
        const index = this.users.findIndex(a => a.dni === dni);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    getUsers() {
        return this.users;
    }

    verificarUsuario(nombre: string, contra: string) {
        this.usuario = this.users.find(a => a.nombre === nombre && a.password === contra);
        return this.usuario;
    }
    
    logout() {
      this.usuario = null;
    }
}
