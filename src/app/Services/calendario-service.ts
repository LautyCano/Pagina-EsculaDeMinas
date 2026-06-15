import { Injectable } from '@angular/core';

export interface EventoCalendario { //estructura de la clase evento
  fecha: string;
  titulo: string;
  descripcion?: string;
  tipo?: 'academico' | 'feriado' | 'especial';
}

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {

  // Días de la semana (empieza en Domingo = 0)
  diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Nombres de los meses (0 = Enero)
  nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  /* LISTA DE EVENTOS IMPORTANTES*/
  eventos: EventoCalendario[] = [
    // Feriados nacionales Argentina 2026
    { fecha: '2026-01-01', titulo: 'Año Nuevo', tipo: 'feriado' },
    { fecha: '2026-02-16', titulo: 'Carnaval', tipo: 'feriado' },
    { fecha: '2026-02-17', titulo: 'Carnaval', tipo: 'feriado' },
    { fecha: '2026-03-02', titulo: 'Inicio de Clases', tipo: 'academico' },
    { fecha: '2026-03-24', titulo: 'Día de la Memoria', tipo: 'feriado' },
    { fecha: '2026-04-02', titulo: 'Día del Veterano de Malvinas', tipo: 'feriado' },
    { fecha: '2026-04-03', titulo: 'Feríado Puente', tipo: 'feriado' },
    { fecha: '2026-05-01', titulo: 'Día del Trabajador', tipo: 'feriado' },
    { fecha: '2026-05-25', titulo: 'Revolución de Mayo', tipo: 'feriado' },
    { fecha: '2026-06-20', titulo: 'Día de la Bandera', tipo: 'feriado' },
    { fecha: '2026-07-09', titulo: 'Día de la Independencia', tipo: 'feriado' },
    { fecha: '2026-08-17', titulo: 'Paso a la Inmortalidad del Gral. San Martín', tipo: 'feriado' },
    { fecha: '2026-10-12', titulo: 'Día del Respeto a la Diversidad Cultural', tipo: 'feriado' },
    { fecha: '2026-11-20', titulo: 'Día de la Soberanía Nacional', tipo: 'feriado' },
    { fecha: '2026-12-08', titulo: 'Inmaculada Concepción de María', tipo: 'feriado' },
    { fecha: '2026-12-25', titulo: 'Navidad', tipo: 'feriado' },
    // Eventos académicos
    { fecha: '2026-03-02', titulo: 'Inicio de Clases 2026', descripcion: 'Inicio del ciclo lectivo', tipo: 'academico' },
    { fecha: '2026-07-13', titulo: 'Inicio Receso Invernal', tipo: 'academico' },
    { fecha: '2026-07-27', titulo: 'Fin Receso Invernal', tipo: 'academico' },
    { fecha: '2026-11-30', titulo: 'Fin de Clases', tipo: 'academico' },
    // Eventos especiales
    { fecha: '2026-03-15', titulo: 'Día de la Educación', tipo: 'especial' },
    
  ];

  constructor() {
    
  }

  getSemanas = (): string[] =>{
    return this.diasSemana;
  }

  getNombresMeses = (): string[] =>{
    return this.nombresMeses;
  }

  getEventos = (): EventoCalendario[] =>{
    return this.eventos;
  }

  addEventos(evento: EventoCalendario) {
    this.eventos.push(evento);
  }

  removeEventos(evento: EventoCalendario) {
    this.eventos = this.eventos.filter(e => 
      !(e.fecha === evento.fecha && e.titulo === evento.titulo)
    );
  }

  updateEventos (original: EventoCalendario, editado: EventoCalendario) {
    const index = this.eventos.findIndex(e => 
      e.fecha === original.fecha && e.titulo === original.titulo
    );
    if (index !== -1) {
      this.eventos[index] = editado;
    }
  }
}
