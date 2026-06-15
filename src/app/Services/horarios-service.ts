import { Injectable } from "@angular/core";

export interface Materia {
  id: number;
  nombre: string;
  dia1: string;
  dia2?: string;
  hora1: string;
  hora2?: string;
  modalidad: "Presencial" | "Virtual";
  profesor: string;
}

export interface HorarioCursos {
  id: number;
  curso: string;
  turno: "Mañana" | "Tarde";
  materias: Materia[];
}

@Injectable({
  providedIn: 'root'
})
export class HorarioService { 
  
  private dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  private turnos = ["Mañana", "Tarde"];
  private modalidades = ["Presencial", "Virtual"];

  materias: Materia[] = []; 

  horarios: HorarioCursos[] = [
    {
      id: 1,
      curso: "3ro Informatica",
      turno: "Tarde",
      materias: [
        {
          id: 1,
          nombre: "Ingles",
          dia1: "Lunes",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Virtual",
          profesor: "Prof. Maria Lopez"
        },
        {
          id: 2,
          nombre: "Programacion",
          dia1: "Martes",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Virtual",
          profesor: "Prof. Juan Perez"
        }
      ]
    },
    {
      id: 2,
      curso: "2do Informatica",
      turno: "Tarde",
      materias: [
        {
          id: 1,
          nombre: "Ingles",
          dia1: "Lunes",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Virtual",
          profesor: "Prof. Maria Lopez"
        },
        {
          id: 2,
          nombre: "Programacion",
          dia1: "Martes",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Virtual",
          profesor: "Prof. Juan Perez"
        },
        {
          id: 3,
          nombre: "Bases de Datos",
          dia1: "Miercoles",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Presencial",
          profesor: "Prof. Carlos Gomez"
        },
        {
          id: 4,
          nombre: "Sistemas",
          dia1: "Jueves",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Presencial",
          profesor: "Prof. Ana Rodriguez"
        },
        {
          id: 5,
          nombre: "Redes",
          dia1: "Viernes",
          dia2: "Viernes",
          hora1: "18:30 - 21:30",
          hora2: "18:30 - 21:30",
          modalidad: "Presencial",
          profesor: "Prof. Pedro Ramirez"
        }
      ]
    }
  ];

  constructor() {}

  addHorario(horario: HorarioCursos) {
    // Calculamos el ID autoincremental de forma segura
    horario.id = this.horarios.length > 0 ? Math.max(...this.horarios.map(h => h.id)) + 1 : 1;
    this.horarios.push(horario);
  }

  addMaterias(materia: Materia) {
    materia.id = this.materias.length + 1; 
    this.materias.push(materia);
  }

  getHorarioByID(id: number): HorarioCursos | null {
    return this.horarios.find(a => a.id === id) || null;
  }
      
  updateHorario(id: number, updatedHorario: HorarioCursos) {
      const index = this.horarios.findIndex(a => a.id === id);
      if (index !== -1) {
          this.horarios[index] = { ...updatedHorario, id }; // Asegura mantener el mismo ID
      }
  }

  deleteHorario(id: number) {
      const index = this.horarios.findIndex(a => a.id === id);
      if (index !== -1) {
          this.horarios.splice(index, 1);
      }
  }

  getHorarios() {
      return this.horarios;
  }

  getTurnos() {
      return this.turnos;
  }

  getModalidades() {
      return this.modalidades;
  }

  getDias() {
      return this.dias;
  }

  getMaterias() {
      return this.materias;
  }
}