import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { SGestionusuarios } from '../../../Services/usuarios-service';
import { PublicacionApi } from '../../../Services/publicacion-api';
import { GestionInscripcion } from '../../../Services/inscripcion-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDarkMode = false;
  noticias: any[] = [];
  distinciones: any[] = [];
  peticiones: any[] = [];
  verNoticia: boolean = false;
  verDistincion: boolean = false;
  peticionSeleccionada: any;

  get usuario(): any {
    return this.serviceUsuarios.usuario;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    private serviceUsuarios: SGestionusuarios,
    public apiPublicaciones: PublicacionApi,
    private gestionInscripcion: GestionInscripcion,
    private cdr: ChangeDetectorRef
  ) {
    this.getNoticias();
    this.getDistinciones();
    this.isDarkMode = this.document.body.classList.contains('dark-mode');
  }

  onPanelOpen() {
    this.getNoticias();
    this.getDistinciones();
    this.getPeticion();
  }

  onSubmit() {
  }

  ngOnInit(){
    this.obtenerRol();
    this.getPeticion();
  }

  cerrarSesion() {
    this.serviceUsuarios.logout();
    const toastMessage = document.getElementById('ToastOut')
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage)
    toastBootstrap.show()
    this.router.navigate(['/']);
  }

  obtenerRol(){
    var rol = this.serviceUsuarios.usuarioGuardar.rol;
    if (rol == "administradorArea") {
      rol = "Administrador del Area";
    }
    if (rol == "administradorResponsableComunicacion") {
      rol = "Administrador Responsable de Comunicación";
    }
    if (rol == "admin") {
      rol = "Administrador";
    }
    return rol;
  }

  //***************************Publicaciones******************************

  addPublicacion() {
    this.router.navigate(['/publicacion']);
  }

  borrarPublicacion(id: number) {
    let borrado: string;
    this.apiPublicaciones.deletePublicacion(id).subscribe(
      (result: any) => {
        borrado = result;
        this.getNoticias();  // Refresca la lista de noticias
        this.getDistinciones();  // Refresca la lista de distinciones
        this.getPeticion();  // Refresca la lista de peticiones
        this.cdr.detectChanges();
        console.log("Se borro la Publicacion?:");
        console.log(borrado);
      },
      (error: any) => {
        console.log(error);
      });
  }

  editarNoticia(noticia: any) {
    localStorage.setItem('itemEditar', JSON.stringify(noticia));// se guarda la noticia en el localStorage para poder editarlo en el componente de publicaciones
    this.router.navigate(['/publicacion'], { 
      state: { data: noticia }
    });
  }

  verNotici(){
    this.verNoticia = !this.verNoticia;
  }

  getNoticias() {
   this.apiPublicaciones.getNoticias().subscribe(
      (result: any) => {
        this.noticias = result;
        this.cdr.detectChanges();
        console.log("Se encotro Noticias?:");
        console.log(this.noticias);
      },
      (error: any) => {
        console.log(error);
      });
  }

//****************************Distinciones*********************************
  
  getDistinciones() {
   this.apiPublicaciones.getDistinciones().subscribe(
      (result: any) => {
        this.distinciones = result;
        this.cdr.detectChanges();
        console.log("Se encotro Distinciones?:");
        console.log(this.distinciones);
      },
      (error: any) => {
        console.log(error);
      });
  }

  borrarDistincion(id: number) {
    this.borrarPublicacion(id);
  }

  editarDistincion(distincion: any) {
    localStorage.setItem('itemEditar', JSON.stringify(distincion));
    this.router.navigate(['/publicacion'], { 
      state: { distincion: distincion }
    });
  }

  verDistinciones(){
    this.verDistincion = !this.verDistincion;
  }

  //****************************Peticiones*********************************
  aprobarPeticion(id: number) {
    let aprobado: string;
    this.apiPublicaciones.putAprobarPeticion(id).subscribe(
      (result: any) => {
        aprobado = result;
        this.getPeticion();  // Refresca la lista de peticiones
        this.getNoticias();  // Refresca noticias por si alguna peticion aprobada era noticia
        this.getDistinciones();  // Refresca distinciones por si alguna era distincion
        this.cdr.detectChanges();
        console.log("Fue Aprobado?:");
        console.log(aprobado);
      },
      (error: any) => {
        console.log(error);
      });
  }

  rechazarPeticion(id: number) {
    let borrado: string;
    this.apiPublicaciones.deletePublicacion(id).subscribe(
      (result: any) => {
        borrado = result;
        this.getPeticion();  // Refresca la lista de peticiones
        this.cdr.detectChanges();
        console.log("Se borro la Publicacion?:");
        console.log(borrado);
      },
      (error: any) => {
        console.log(error);
      });
  }

  getPeticion() {
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

  infoPeticion(peticion: any) {
    this.peticionSeleccionada = peticion;

    const panelModal = document.getElementById('panel');
    if (panelModal) {
      const panelInstance = (window as any).bootstrap.Modal.getInstance(panelModal);
      if (panelInstance) {
        panelInstance.hide();
      }
    }

    const infoModal = document.getElementById('infoModal');
    if (infoModal) {
      const infoInstance = new (window as any).bootstrap.Modal(infoModal);
      infoInstance.show();
    }
  }

  realizarPeticion() {
   this.router.navigate(['/publicacion'], { 
      state: { esPeticion: true }
    });
  }

  administrarPeticiones() {
   this.router.navigate(['/publicacion']);
  }

//*********************************Registrar Usuario*********************************
  RegistarUsuario(){
    const newNombre = document.getElementById('nombre') as HTMLInputElement;
    const newContra = document.getElementById('contra') as HTMLInputElement;
    const newRol = document.getElementById('rol') as HTMLInputElement;
    
    const newUser = {
      nombre: newNombre.value,
      password: newContra.value,
      rol: newRol.value
    }

    this.serviceUsuarios.addUser(newUser);
    const toastMessage = document.getElementById('ToastAdd')
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage)
    toastBootstrap.show()
    this.router.navigate(['/home']);
  }

  cambiarEstadoInscripcion(){
    this.gestionInscripcion.cambiarEstadoInscripcion();
  }

  getEstadoInscripcion(){
    return this.gestionInscripcion.getEstadoInscripcion();
  }
  
//*******************************Calendario******************************
  administrarFechas(){
    this.router.navigate(['/calendario']);
  }

  administrarHorarios() {
    this.router.navigate(['/horarios-cursos']);
  }
//****************************Modal del tema dark y light******************************
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
     }
  }
}
