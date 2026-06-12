import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasServices } from '../../../Services/noticias-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})

export class Publicaciones implements OnInit {

  // Variable para controlar el envio del formulario
  noticiaSeleccionada: any;
  distincionSeleccionada: any;
  esEdicion: boolean = false;
  submitted: boolean = false;
  esDistincion: boolean = false;
  
  noticiaForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    imagen: new FormControl(''),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  // Formulario public publicacionForm: FormGroup;


  // Constructor
  constructor(
    public noticiasService: NoticiasServices, // Importamos el servicio
    private router: Router
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const estado = navegacion?.extras.state;

    if (estado && estado['data']) {
      this.noticiaSeleccionada = estado['data'];
      this.esEdicion = true; // Bandera para avisar que es edicion
      
      // Rellenamos las variables del formulario con los datos recibidos
      this.noticiaForm.patchValue({
        id: this.noticiaSeleccionada.id,
        titulo: this.noticiaSeleccionada.titulo,
        descripcion: this.noticiaSeleccionada.descripcion
      });
    } else if (estado && estado['distincion']) {
      this.distincionSeleccionada = estado['distincion'];
      this.esEdicion = true;
      this.esDistincion = true; 
      
      this.noticiaForm.patchValue({
        id: this.distincionSeleccionada.id,
        titulo: this.distincionSeleccionada.titulo,
        descripcion: this.distincionSeleccionada.descripcion
      });
    }
  }

  ngOnInit() { 
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.noticiaForm.reset();
    this.submitted = false;

  }

  // Metodo que se ejecuta al registrar el formulario
  onSubmit() {
    this.submitted = true;
    if (this.noticiaForm.valid) {
      if (this.esEdicion) {
        if (this.esDistincion) {
          this.updateDistincion();
        } else {
          this.updateNoticia();
        }
      } else {
        if (this.esDistincion) {
          this.addDistincion();
        } else {
          this.addNoticia();
        }
      }
    }
  }


  //***************NOTICIA****************
  addNoticia() {
    const existe = this.noticiasService.getNoticiaById(this.noticiaForm.value.id);
    if (existe) {
      alert('Ya existe una noticia con este ID');
    } else {
      this.noticiaForm.value.id = this.noticiasService.getNoticias().length + 1;
      this.noticiasService.addNoticia(this.noticiaForm.value);
      alert('Noticia agregada correctamente');
    }
    this.limpiarFormulario();
  }

  updateNoticia() {
    this.noticiasService.updateNoticia(this.noticiaForm.value.id, this.noticiaForm.value);
    alert('Noticia actualizada correctamente');
    this.limpiarFormulario();
  }

  //***************DISTINCION****************
  addDistincion() {
    const existe = this.noticiasService.getDistincionById(this.noticiaForm.value.id);
    if (existe) {
      alert('Ya existe una distincion con este ID');
    } else {
      this.noticiasService.addDistincion(this.noticiaForm.value);
      alert('Distincion agregada correctamente');
    }
    this.limpiarFormulario();
  }

  updateDistincion() {
    this.noticiasService.updateDistincion(this.noticiaForm.value.id, this.noticiaForm.value);
    alert('Distincion actualizada correctamente');
    this.limpiarFormulario();
  }
}