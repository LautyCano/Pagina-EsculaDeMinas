import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carreras',
  imports: [CommonModule],
  templateUrl: './carreras.html',
  styleUrl: './carreras.css',
})

export class Carreras {

  constructor() {}
  tecnicaturas = [
    {
      img: "/img/cicloBasico.webp",
      nombre: "Ciclo Básico",
      duracion: "3 años",
      descripcion: "Comprende de 1ro. a 3er. año de cursado. Está diseñado como una etapa de nivelación y fundamentación obligatoria antes de ingresar a las especialidades.",
      plan: "https://escmi.unju.edu.ar/document/basico.pdf"
    },
    {
      img: "/img/tecnico-informatica.webp",
      nombre: "Tecnicatura en Informática",
      duracion: "3 años",
      descripcion: "Especialidad clave en software y sistemas, la cual cuenta con una articulación directa con la carrera de Analista Programador Universitario (APU) en la Facultad de Ingeniería de la UNJu.",
      plan: "https://escmi.unju.edu.ar/document/informatica.pdf"
    },
    {
     img: "/img/tecnico-Quimica.webp",
      nombre: "Tecnicatura en Quimica",
      duracion: "3 años",
      descripcion: "Enfocada en el trabajo de laboratorio, análisis de procesos químicos y control de calidad.",
      plan: "https://escmi.unju.edu.ar/document/quimica.pdf"
    },
    {
      img: "/img/tecnico-minas.webp",
      nombre: "Tecnicatura en Minería",
      duracion: "3 años",
      descripcion: "Orientada al desarrollo y optimización de procesos minero-industriales de la región.",
      plan: "https://escmi.unju.edu.ar/document/minas.pdf"
    }
  ];

  onSubmit() {}

}
