import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticiasServices {
    noticias = [
      {
        id: 1,
        titulo: 'Fechas de Inscripción',
        imagen: '/img/colegio-de-minas.webp',
        descripcion: 'La Escuela de Minas “Dr. Horacio Carrillo” de la Universidad Nacional de Jujuy, tiene abiertas las inscripciones para primer año del Ciclo Lectivo 2024. Se entregarán 500 formularios para alumnos que finalizaron el primario, de los cuales 200 son para alumnos que asisten a escuelas de la Capital y 300 para los provenientes del interior de la provincia, según informó el director del establecimiento, Lic. Fernando Sueiro y Sueiro. En tanto, el periodo de inscripción será a partir del 16 de octubre.  Por mayor información, los interesados deberán dirigirse a la sede de la Escuela de Minas, en calle República Árabe Siria esquina 25 de Mayo.',
      },
      {
        id: 2,
        titulo: 'Calendario Anual Escuela de minas',
        imagen: '/img/sede_quiaca.png',
        descripcion: 'Se publica el calendario Anual de la escuela de minas junto con sus dias festivos y feriados'
      },
      {
        id: 3,
        titulo: 'Notificacion Iportante para todos los alumnos',
        imagen: '/img/sedeYuto.webp',
        descripcion: 'Se informa a todos los estudiantes de la Escuela de Minas “Dr. Horacio Carrillo” de la Universidad Nacional de Jujuy, sobre el inicio del ciclo lectivo 2026. \n\n Durante la primera semana habra clases con solo mitad de personal por lo tanto los alumnos del Ciclo Superior asistiran media tarde'
      },
    ];

     distinciones = [
      {
        id: 1,
        titulo: 'Nueva Representante Escuela de Minas Capital',
        imagen: '/img/colegio-de-minas.webp',
        descripcion: 'La Escuela de Minas “Dr. Horacio Carrillo” de la Universidad Nacional de Jujuy, ya tiene una nueva representante, durante el ciclo lectivo 2026. \n\n La flamante representante fue elegida el dia "Domingo 14 de junio" en el salon de "El Ceibo" El nombre de la nueva representante es Maximiliana Calpa '
      },
      {
        id: 2,
        titulo: 'Feria de Ciencias y Tecnicas',
        imagen: '/img/sede_quiaca.png',
        descripcion: 'La feria de Ciencias y tecnicas se llevo a cabo en la istalaciones de La Escuela de Minas con un ganador al mas Inovador en JUJUY '
      },
      {
        id: 3,
        titulo: 'Torneo Intercolegial Futbol y Voley',
        imagen: '/img/sedeYuto.webp',
        descripcion: 'Torneo Flash de Futbol y Voley en la Escuela de Minas. \n\n Durante el finde de semana se llevo a cabo un torneo de futbol y voley intercolegial en las instalaciones de la Escuela de Minas.'
      }
    ];

    constructor() {
    }
    
    // ********************NOTICIAS*****************************
    // Agrega el alumno al array
    addNoticia(noticia: any) {
        this.noticias.push(noticia);
    }

    // Busca la noticia por id
    getNoticiaById(id: number): any {
        return this.noticias.find(a => a.id === id) || null;
    } 
    
    // Actualiza la noticia por id
    updateNoticia(id: number, updatedNoticia: any) {
        const index = this.noticias.findIndex(a => a.id === id);
        if (index !== -1) {
            this.noticias[index] = { ...updatedNoticia };
        }
    }

    // Borra la noticia por id
    deleteNoticia(id: number) {
        const index = this.noticias.findIndex(a => a.id === id);
        if (index !== -1) {
            this.noticias.splice(index, 1);
        }
    }

    getNoticias() {
        return this.noticias;
    }

    // ********************DISTINCIONES*****************************
    // Agrega la distincion al array
    addDistincion(distincion: any) {
        this.distinciones.push(distincion);
    }

    // Busca la distincion por id
    getDistincionById(id: number): any {
        return this.distinciones.find(a => a.id === id) || null;
    } 
    
    // Actualiza la distincion por id
    updateDistincion(id: number, updatedDistincion: any) {
        const index = this.distinciones.findIndex(a => a.id === id);
        if (index !== -1) {
            this.distinciones[index] = { ...updatedDistincion };
        }
    }

    // Borra la distincion por id
    deleteDistincion(id: number) {
        const index = this.distinciones.findIndex(a => a.id === id);
        if (index !== -1) {
            this.distinciones.splice(index, 1);
        }
    }

    getDistinciones() {
        return this.distinciones;
    }
}
