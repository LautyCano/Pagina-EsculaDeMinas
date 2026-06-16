import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { SGestionusuarios } from '../../../Services/usuarios-service';
import { NoticiasServices } from '../../../Services/noticias-service';
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
    private noticiasService: NoticiasServices,
    private gestionInscripcion: GestionInscripcion
  ) {
    this.noticias = this.noticiasService.getNoticias();
    this.distinciones = this.noticiasService.getDistinciones();
    this.isDarkMode = this.document.body.classList.contains('dark-mode');
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

  administrarPeticiones() {
   this.router.navigate(['/publicaciones']);
  }

  realizarPeticion() {
   this.router.navigate(['/publicaciones'], { 
      state: { esPeticion: true }
    });
  }

  //***************************Noticias******************************
  borrarNoticia(id: number) {
    this.noticiasService.deleteNoticia(id);
  }

  editarNoticia(noticia: any) {
    localStorage.setItem('itemEditar', JSON.stringify(noticia));// se guarda la noticia en el localStorage para poder editarlo en el componente de publicaciones
    this.router.navigate(['/publicaciones'], { 
      state: { data: noticia }
    });
  }

  verNotici(){
    this.verNoticia = !this.verNoticia;
  }

//****************************Distinciones*********************************
  borrarDistincion(id: number) {
    this.noticiasService.deleteDistincion(id);
  }

  editarDistincion(distincion: any) {
    localStorage.setItem('itemEditar', JSON.stringify(distincion));
    this.router.navigate(['/publicaciones'], { 
      state: { distincion: distincion }
    });
  }

  verDistinciones(){
    this.verDistincion = !this.verDistincion;
  }

  addNoticia() {
    this.router.navigate(['/publicaciones']);
  }

  //****************************Peticiones*********************************
  aprobarPeticion(id: number) {
    this.noticiasService.aprobarPeticion(id);
  }

  rechazarPeticion(id: number) {
    this.noticiasService.deletePeticion(id);
  }

  getPeticion() {
    this.peticiones = this.noticiasService.getPeticiones();
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
