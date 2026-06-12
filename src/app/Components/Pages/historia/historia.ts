import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historia',
  imports: [CommonModule],
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class Historia {
  constructor(){}

  historias = [
    {
      title: 'Creación y Primeros Años (1943 - 1944)',
      text: 'La Escuela de Minas “Dr. Horacio Carrillo” UNJu, fue creada el 8 de julio de 1943, pasando a depender de la Universidad Nacional de Tucumán el 11 de marzo de 1944.',
      highlight: 'Al momento de su creación, se consideraron estos fines y funciones: la necesidad de profesionales técnicos especializados en Minería, teniendo en cuenta la importancia de esta actividad en toda la República, y formar técnicos mineros que contribuyan al desarrollo de la industria pesada.'
    },
    {
      title: 'Transferencia y Expansión (1977 - 1993)',
      text: 'Por Ley Nº 21036 se transfiere la Escuela de Minas a la Universidad Nacional de Jujuy a partir del 01 de enero de 1977.',
      highlight: 'En el año 1993 se incorpora la orientación Química como nueva oferta educativa y se crean las carreras de Nivel Terciario: Minas y Química.'
    },
    {
      title: 'Políticas Pre-Universitarias (2006 - 2007)',
      text: 'El 14 de diciembre de 2006 el Consejo Superior estableció la dependencia directa de la Escuela a través de la Dirección de Enseñanza Pre-Universitaria, de la máxima autoridad ejecutiva de la UNJu (Resolución C.S. Nº 0289/06).',
      highlight: 'Por primera vez el Consejo Superior de la UNJu definió y aprobó Políticas Institucionales para la Enseñanza Pre-Universitaria (Resolución C.S. Nº 002/07).'
    },
    {
      title: 'Nuevas Especialidades e Hitos',
      text: 'En respuesta al compromiso contraído por la Secretaría de Políticas Universitarias y las Políticas de Articulación de la Educación Superior asumidas por la Universidad Nacional de Jujuy, se creó la carrera Técnica Profesional de nivel Secundario en Informática (Resolución C.S. Nº 0367/07).',
      highlight: 'Producción Audiovisual con fotos de nuestra historia realizada por UNJuTV para el acto de conmemoración de los 75 años de la creación de nuestra Escuela.'
    }
  ];


  currentHistoria = 0;

  siguiente() {
    this.currentHistoria = (this.currentHistoria + 1) % this.historias.length;
  }

  anterior() {
    this.currentHistoria = (this.currentHistoria - 1 + this.historias.length) % this.historias.length;
  }

  setHistoria(index: number) {
    this.currentHistoria = index;
  }
}
