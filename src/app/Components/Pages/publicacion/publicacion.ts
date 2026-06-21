import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PublicacionApi } from '../../../Services/publicacion-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion implements OnInit {

  noticiaSeleccionada: any;
  distincionSeleccionada: any;
  esEdicion: boolean = false;
  submitted: boolean = false;
  esPeticion: boolean = false;
  peticiones: any[] = [];
  imagePreview: SafeUrl | string = '';  // Para mostrar la vista previa de la imagen
  
  // Declaramos el FormGroup mapeando exactamente los campos del HTML
  noticiaForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    imagen: new FormControl(''),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required), // 'noticia' o 'distincion' — se mapea directo al backend
    diasRestantes: new FormControl('', Validators.required),
  });

  constructor( 
    public apiPublicaciones: PublicacionApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
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
        imagen: this.noticiaSeleccionada.imagen,
        diasRestantes: this.noticiaSeleccionada.diasRestantes,
        tipo: 'noticia'
      });
      this.imagePreview = this.domSanitizer.bypassSecurityTrustUrl(this.noticiaSeleccionada.imagen);
    } else if (estado && estado['distincion']) {
      this.distincionSeleccionada = estado['distincion'];
      this.esEdicion = true;

      this.noticiaForm.patchValue({
        id: this.distincionSeleccionada.id,
        titulo: this.distincionSeleccionada.titulo,
        descripcion: this.distincionSeleccionada.descripcion,
        imagen: this.distincionSeleccionada.imagen,
        diasRestantes: this.distincionSeleccionada.diasRestantes,
        tipo: 'distincion'
      });
      this.imagePreview = this.domSanitizer.bypassSecurityTrustUrl(this.distincionSeleccionada.imagen);
    }

    if (estado && estado['esPeticion']) {
      this.esPeticion = estado['esPeticion'];
    }
  }

  ngOnInit() { 
    this.obtenerTodasPeticiones();
  }

  limpiarFormulario() {
    this.noticiaForm.reset({ id: 0, imagen: '', titulo: '', descripcion: '', tipo: '', diasRestantes: '' });
    this.submitted = false;
    this.imagePreview = ''; // Limpia la vista previa
  }

  // Convierte la imagen seleccionada a Base64 y la guarda en el formulario
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      // Guardamos el Base64 en el control 'imagen' del formulario
      this.noticiaForm.patchValue({ imagen: base64 });
      // Guardamos la URL segura para mostrar la vista previa
      this.imagePreview = this.domSanitizer.bypassSecurityTrustUrl(base64);
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;
    if (this.noticiaForm.valid) {
      if (this.esEdicion) {
        this.updatePublicacion(this.noticiaForm.value.id, this.noticiaForm.value);
        this.router.navigate(['/']);
      } else if (this.esPeticion) {
        this.addPeticion(this.noticiaForm.value);
        this.router.navigate(['/']);
      } else {
        this.addPublicacion(this.noticiaForm.value);
        this.router.navigate(['/']);
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  //***************PUBLICACION****************
  addPublicacion(publicacion: any) {
    const data = { ...publicacion, estado: 'aprobado' }; // Agrega estado requerido por el backend
    delete data.id; // Evita enviar id:0 al POST (el id lo auto-genera PostgreSQL)
    let publicado: string;
    this.apiPublicaciones.postPublicar(data).subscribe(
      (result: any) => {
        publicado = result;
        this.cdr.detectChanges();
        console.log("Se agrego la Publicacion?:");
        console.log(publicado);
      },
      (error: any) => {
        console.log(error);
      }
    )
    this.limpiarFormulario();
  }

  updatePublicacion(id: number, publicacion: any) {
    let actualizado: string;
   this.apiPublicaciones.putModificarPublicacion(id, publicacion).subscribe(
      (result: any) => {
        actualizado = result;
        this.cdr.detectChanges();
        console.log("Se actualizo la Publicacion?:");
        console.log(actualizado);
      },
      (error: any) => {
        console.log(error);
      });

    this.limpiarFormulario();
  }

  deletePublicacion(id: number){
    let borrado: string;
    this.apiPublicaciones.deletePublicacion(id).subscribe(
      (result: any) => {
        borrado = result;
        this.cdr.detectChanges();
        console.log("Se borro la Publicacion?:");
        console.log(borrado);
      },
      (error: any) => {
        console.log(error);
      });
  }

  //***************DISTINCION****************

  getDistinciones() {
  let distinciones: any;

   this.apiPublicaciones.getDistinciones().subscribe(
      (result: any) => {
        distinciones = result;
        this.cdr.detectChanges();
        console.log("Se encotro Distinciones?:");
        console.log(distinciones);
      },
      (error: any) => {
        console.log(error);
      });
  }
 
  //***************PETICION****************

  addPeticion(peticion: any) {
    const data = { ...peticion, estado: 'pendiente' }; // Agrega estado requerido por el backend
    delete data.id; // Evita enviar id:0 al POST (el id lo auto-genera PostgreSQL)
    let peticionRecibida: string;
    this.apiPublicaciones.postPublicar(data).subscribe(
      (result: any) => {
        peticionRecibida = result;
        this.cdr.detectChanges();
        console.log("Se agrego la Peticion?:");
        console.log(peticionRecibida);
      },
      (error: any) => {
        console.log(error);
      }
    )
    
    const toastMessage = document.getElementById('ToastPeticion');
    if(toastMessage) {
      const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage);
      toastBootstrap.show();
    }
    this.obtenerTodasPeticiones(); // Recarga la grilla inferior al añadir una nueva
    this.limpiarFormulario();
  }

  obtenerTodasPeticiones() {
    this.apiPublicaciones.getPeticiones().subscribe(
      (result: any) => {
        this.peticiones = result;
        this.cdr.detectChanges();
        console.log("Se encontro Peticiones?:");
        console.log(this.peticiones);
      },
      (error: any) => {
        console.log(error);
      });
  }

  aprobarPeticion(id: number) {
    let aprobado: string;
    this.apiPublicaciones.putAprobarPeticion(id).subscribe(
      (result: any) => {
        aprobado = result;
        this.cdr.detectChanges();
        console.log("Fue Aprobado?:");
        console.log(aprobado);
      },
      (error: any) => {
        console.log(error);
      });
  }

  rechazarPeticion(id: number) {
    this.deletePublicacion(id);
  }
}