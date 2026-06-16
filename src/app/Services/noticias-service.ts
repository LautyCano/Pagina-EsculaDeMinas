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
        diasRestantes: 15
      },
      {
        id: 2,
        titulo: 'Calendario Anual Escuela de minas',
        imagen: '/img/sede_quiaca.png',
        descripcion: 'Se publica el calendario Anual de la escuela de minas junto con sus dias festivos y feriados',
        diasRestantes: 3
      },
      {
        id: 3,
        titulo: 'Notificacion Iportante para todos los alumnos',
        imagen: '/img/sedeYuto.webp',
        descripcion: 'Se informa a todos los estudiantes de la Escuela de Minas “Dr. Horacio Carrillo” de la Universidad Nacional de Jujuy, sobre el inicio del ciclo lectivo 2026. \n\n Durante la primera semana habra clases con solo mitad de personal por lo tanto los alumnos del Ciclo Superior asistiran media tarde',
        diasRestantes: 10
      },
    ];

     distinciones = [
      {
        id: 1,
        titulo: 'Nueva Representante Escuela de Minas Capital',
        imagen: '/img/colegio-de-minas.webp',
        descripcion: 'La Escuela de Minas “Dr. Horacio Carrillo” de la Universidad Nacional de Jujuy, ya tiene una nueva representante, durante el ciclo lectivo 2026. \n\n La flamante representante fue elegida el dia "Domingo 14 de junio" en el salon de "El Ceibo" El nombre de la nueva representante es Maximiliana Calpa ',
        diasRestantes: 5
      },
      {
        id: 2,
        titulo: 'Feria de Ciencias y Tecnicas',
        imagen: '/img/sede_quiaca.png',
        descripcion: 'La feria de Ciencias y tecnicas se llevo a cabo en la istalaciones de La Escuela de Minas con un ganador al mas Inovador en JUJUY ',
        diasRestantes: 2
      },
      {
        id: 3,
        titulo: 'Torneo Intercolegial Futbol y Voley',
        imagen: '/img/sedeYuto.webp',
        descripcion: 'Torneo Flash de Futbol y Voley en la Escuela de Minas. \n\n Durante el finde de semana se llevo a cabo un torneo de futbol y voley intercolegial en las instalaciones de la Escuela de Minas.',
        diasRestantes: 7
      }
    ];

    peticiones = [
      {
        id: 1,
        titulo: 'Peticion 1',
        imagen: '/img/sedeYuto.webp',
        descripcion: 'Descripcion de la peticion 1',
        tipo: 'Distincion',
        modalidad: 'Presencial',
        diasRestantes: 2
      },
      {
        id: 2,
        titulo: 'Peticion 2',
        imagen: '/img/colegio-de-minas.webp',
        descripcion: 'Descripcion de la peticion 2',
        tipo: 'Noticia',
        modalidad: 'Virtual',
        diasRestantes: 3
      },
      {
        id: 3,
        titulo: 'Peticion 3',
        imagen: '/img/sede_quiaca.png',
        descripcion: 'Descripcion de la peticion 3',
        tipo: 'Distincion',
        modalidad: 'Presencial',
        diasRestantes: 4
      }
    ];

    constructor() {
    }
    
    // ********************NOTICIAS*****************************
    // Agrega el alumno al array
    addNoticia(noticia: any) {
        const index = this.noticias.length + 1;
        this.noticias.push({id: index, ...noticia}); // Se agrega el id al objeto noticia
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
        const index = this.distinciones.length + 1;
        this.distinciones.push({id: index, ...distincion});
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

    // ********************PETICIONES*****************************
    // Agrega la peticion al array
    addPeticion(peticion: any) {
        const index = this.peticiones.length + 1;
        this.peticiones.push({id: index, ...peticion});
    }

    // Busca la peticion por id
    getPeticionById(id: number): any {
        return this.peticiones.find(a => a.id === id);
    } 
    
    // Actualiza la peticion por id
    aprobarPeticion(id: number) {
        const index = this.peticiones.findIndex(a => a.id === id);
        if (index !== -1) {
            if (this.peticiones[index].tipo == 'Noticia') {
                this.noticias.push(this.peticiones[index]);
            } else if (this.peticiones[index].tipo == 'Distincion') {
                this.distinciones.push(this.peticiones[index]);
            }
            this.deletePeticion(id);
        }
    }

    // Borra la peticion por id
    deletePeticion(id: number) {
        const index = this.peticiones.findIndex(a => a.id === id);
        if (index !== -1) {
            this.peticiones.splice(index, 1);
        }
    }

    getPeticiones() {
        return this.peticiones;
    }
}
