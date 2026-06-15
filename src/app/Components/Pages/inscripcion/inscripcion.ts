import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestionInscripcion } from '../../../Services/inscripcion-service';

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inscripcion.html',
  styleUrl: './inscripcion.css',
})

export class Inscripcion implements OnInit {

  // Variable para controlar el envio del formulario
  submitted = false;
  anoActual: any = new Date();
  
  // Formulario
  public inscripcionForm: FormGroup;

  // Array que almacena las categorias
  categorias = [
    { id: 1, nombre: "Ingresante" },
    { id: 2, nombre: "Ciclo Basico" },
    { id: 3, nombre: "Ciclo Superior" }
  ];

  cursos = [
    {id: 1, nombre: "Tecnico Informatica"},
    {id: 2, nombre: "Tecnico Quimica"},
    {id: 3, nombre: "Tecnico Mineria"}
  ];

  // Constructor
  constructor(
    private formBuilder: FormBuilder, // Builder para construir el formulario
    public gestionService: GestionInscripcion // Importamos el servicio
  ) {
    this.inscripcionForm = this.formBuilder.group({
      dniAlumno: new FormControl('', [Validators.required, Validators.pattern("\\d{7,8}")]),
      nombreAlumno: new FormControl('', [Validators.required]),
      apellidoAlumno: new FormControl('', [Validators.required]),
      categoriaAlumno: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      curso: new FormControl(''),
      dnitutor: new FormControl(''),
      actaNacimiento: new FormControl(''),
      certificadoEstudio: new FormControl(''),
      fichaSalud: new FormControl(''),
      libretaNotas: new FormControl(''),
      numeroTelefonoTutor: new FormControl('')
    });
    this.anoActual = this.anoActual.getFullYear();
  }

  ngOnInit() { 
    // Se ejecuta al inicializar el componente
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.inscripcionForm.reset();
    this.submitted = false;
  }

  // Metodo que se ejecuta al registrar el formulario
  onSubmit() {
    this.submitted = true;
    this.verificacionForm();
  }

  verificacionEstadoInscripcion(){
    return this.gestionService.getEstadoInscripcion();
  }

  verificacionForm() {
    // — INGRESANTE —
    if (this.inscripcionForm.value.categoriaAlumno == 'Ingresante'
      && this.inscripcionForm.value.dnitutor
      && this.inscripcionForm.value.actaNacimiento
      && this.inscripcionForm.value.certificadoEstudio) {

      const ingresante = this.inscripcionForm.value;
      const existe = this.gestionService.getAlumnoByDni(ingresante.dniAlumno);

      if (existe) {
        alert('Ya existe un alumno con este DNI');
      } else {
        this.gestionService.addAlumno(ingresante);
        alert('Ingresante inscripto correctamente');
      }
      this.limpiarFormulario();

    // — CICLO BÁSICO —
    } else if (this.inscripcionForm.value.categoriaAlumno == 'Ciclo Basico'
      && this.inscripcionForm.value.fichaSalud
      && this.inscripcionForm.value.libretaNotas) {

      const alumno = this.inscripcionForm.value;
      const existe = this.gestionService.getAlumnoByDni(alumno.dniAlumno);

      if (existe) {
        alert('Ya existe un alumno con este DNI');
      } else {
        this.gestionService.addAlumno(alumno);
        alert('Alumno inscripto correctamente');
      }
      this.limpiarFormulario();

    // — CICLO SUPERIOR —
    } else if (this.inscripcionForm.value.categoriaAlumno == 'Ciclo Superior'
      && this.inscripcionForm.value.curso
      && this.inscripcionForm.value.libretaNotas
      && this.inscripcionForm.value.actaNacimiento
      && this.inscripcionForm.value.dnitutor) {

      const alumno = this.inscripcionForm.value;
      const existe = this.gestionService.getAlumnoByDni(alumno.dniAlumno);

      if (existe) {
        alert('Ya existe un alumno con este DNI');
      } else {
        this.gestionService.addAlumno(alumno);
        alert('Alumno inscripto correctamente');
      }
      this.limpiarFormulario();

    } else {
      alert('Por favor, complete el formulario correctamente');
    }
  }
}