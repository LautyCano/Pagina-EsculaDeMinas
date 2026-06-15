import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GestionInscripcion {
    alumnos: any[] = [];
    ingresantes: any[] = [];
    estadoInscripcion: boolean = false; // Para validar si estan abiertas las inscripciones

    constructor() {
        // Inicializamos el arreglo de alumnos
        this.alumnos = [];
        this.ingresantes = [];
    }

    getEstadoInscripcion(){
        return this.estadoInscripcion;
    }
    
    cambiarEstadoInscripcion(){
        this.estadoInscripcion = !this.estadoInscripcion;
    }
    
    // Agrega el alumno al array
    addAlumno(alumno: any) {
        this.alumnos.push(alumno);
    }

    // Busca el alumno a través del DNI
    getAlumnoByDni(dni: string): any {
        return this.alumnos.find(a => a.dni === dni) || null;
    } 
    
    // Actualiza el alumno a través del DNI
    updateAlumno(dni: string, updatedAlumno: any) {
        const index = this.alumnos.findIndex(a => a.dni === dni);
        if (index !== -1) {
            this.alumnos[index] = { ...updatedAlumno };
        }
    }

    // Borra el alumno a través del DNI
    deleteAlumno(dni: string) {
        const index = this.alumnos.findIndex(a => a.dni === dni);
        if (index !== -1) {
            this.alumnos.splice(index, 1);
        }
    }

    getAlumnos() {
        return this.alumnos;
    }
}
