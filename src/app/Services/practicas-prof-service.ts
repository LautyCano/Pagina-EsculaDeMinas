import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PractProfService {
  cursos = [
    {
      id: 1,
      nombre: 'Taller de Programacion Web',
      img: '/img/tallereb.webp',
      descripcion: 'En este curso aprenderás a crear páginas web utilizando HTML, CSS y JavaScript.',
      duracionDias: 20,
      profesor: 'Prof. Juan Perez',
      modalidad: 'Virtual',
      fechaInicio: '01/01/2025',
      fechaFin: '01/01/2025',
      horarios: 'Lunes, 10:00 - 12:00',
      horasProfesionalizantes: 20,  
    },
    {
      id: 2,
      nombre: 'Taller de Cuidado al Medio Ambiente',
      img: '/img/cuidado.webp',
      descripcion: 'En este curso aprenderás sobre la importancia del cuidado del medio ambiente y cómo podemos contribuir a su protección.',
      duracionDias: 30,
      profesor: 'Prof. Maria Lopez',
      modalidad: 'Presencial',
      fechaInicio: '02/02/2025',
      fechaFin: '02/02/2025',
      horarios: 'Martes, 14:00 - 16:00',
      horasProfesionalizantes: 30,  
    },
    {
      id: 3,
      nombre: 'Olimpiadas de Robótica',
      img: '/img/robotica.webp',
      descripcion: 'Participa en las olimpiadas de robótica y demuestra tus habilidades de robótica.',
      duracionDias: 20,
      profesor: 'Prof. Mario Gomez',
      modalidad: 'Presencial',
      fechaInicio: '03/03/2025',
      fechaFin: '03/03/2025',
      horarios: 'Miercoles, 16:00 - 18:00',
      horasProfesionalizantes: 40,  
    },
  ];

   // Agrega el curso al array
    addPractica(curso: any) {
        this.cursos.push(curso);
    }

    // Busca el curso a través del DNI
    getPracticaById(id: number): any {
        return this.cursos.find(a => a.id === id) || null;
    } 
    
    // Actualiza el curso a través del DNI
    updatePractica(id: number, updatedPractica: any) {
        const index = this.cursos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.cursos[index] = { ...updatedPractica };
        }
    }

    // Borra el curso a través del DNI
    deletePractica(id: number) {
        const index = this.cursos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.cursos.splice(index, 1);
        }
    }

    getPracticas() {
        return this.cursos;
    }
}
