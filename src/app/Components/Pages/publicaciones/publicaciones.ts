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

  noticiaSeleccionada: any;
  distincionSeleccionada: any;
  esEdicion: boolean = false;
  submitted: boolean = false;
  esPeticion: boolean = false;
  peticiones: any[] = [];
  
  // Declaramos el FormGroup mapeando exactamente los campos del HTML
  noticiaForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    imagen: new FormControl(''),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    esDistincion: new FormControl('', Validators.required),
    diasRestantes: new FormControl('', Validators.required),
  });

  constructor(
    public noticiasService: NoticiasServices, 
    private router: Router
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const estado = navegacion?.extras.state;

    if (estado && estado['data']) {
      this.noticiaSeleccionada = estado['data'];
      this.esEdicion = true; 
      
      this.noticiaForm.patchValue({
        id: this.noticiaSeleccionada.id,
        titulo: this.noticiaSeleccionada.titulo,
        descripcion: this.noticiaSeleccionada.descripcion,
        diasRestantes: this.noticiaSeleccionada.diasRestantes,
        esDistincion: 'noticia' // Setea el select por defecto
      });
    } else if (estado && estado['distincion']) {
      this.distincionSeleccionada = estado['distincion'];
      this.esEdicion = true;

      this.noticiaForm.patchValue({
        id: this.distincionSeleccionada.id,
        titulo: this.distincionSeleccionada.titulo,
        descripcion: this.distincionSeleccionada.descripcion,
        diasRestantes: this.distincionSeleccionada.diasRestantes,
        esDistincion: 'distincion' // Setea el select por defecto
      });
    }

    if (estado && estado['esPeticion']) {
      this.esPeticion = estado['esPeticion'];
    }
  }

  ngOnInit() { 
    this.obtenerTodasPeticiones();
  }

  limpiarFormulario() {
    this.noticiaForm.reset({ id: 0, imagen: '', titulo: '', descripcion: '', esDistincion: '', diasRestantes: '' });
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.noticiaForm.valid) {
      const tipoPublicacion = this.noticiaForm.value.esDistincion;

      if (this.esEdicion) {
        if (tipoPublicacion === "distincion") {
          this.updateDistincion();
        } else {
          this.updateNoticia();
        }
      } else {
        if (tipoPublicacion === "distincion") {
          this.addDistincion();
        } else {
          this.addNoticia();
        }
      }

      if (this.esPeticion) {
        this.addPeticion();
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
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

  //***************PETICION****************
  addPeticion() {
    this.noticiasService.addPeticion(this.noticiaForm.value);
    const toastMessage = document.getElementById('ToastPeticion');
    if(toastMessage) {
      const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage);
      toastBootstrap.show();
    }
    this.obtenerTodasPeticiones(); // Recarga la grilla inferior al añadir una nueva
    this.limpiarFormulario();
  }

  obtenerTodasPeticiones() {
    this.peticiones = this.noticiasService.getPeticiones() || [];
  }

  aprobarPeticion(id: number) {
    this.noticiasService.aprobarPeticion(id);
  }

  rechazarPeticion(id: number) {
    this.noticiasService.deletePeticion(id);
  }
}