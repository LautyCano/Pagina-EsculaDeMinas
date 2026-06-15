import { Component } from '@angular/core';
import { PractProfService } from '../../../Services/practicas-prof-service';
import { SGestionusuarios } from '../../../Services/usuarios-service';

@Component({
  selector: 'app-practicas-prof',
  imports: [],
  templateUrl: './practicas-prof.html',
  styleUrl: './practicas-prof.css',
})
export class PracticasProf {

  practicas: any[] = [];
  practicaSeleccionada: any = [];
  usuarioregistrar: any = [];

  constructor(private practicasService: PractProfService, private usuariosService: SGestionusuarios) {
    this.practicas = this.practicasService.getPracticas();
  }

  infoPractica(id: number) {
    this.practicaSeleccionada = this.practicasService.getPracticaById(id);
  }

  registarUsuario(){
    this.usuarioregistrar = this.usuariosService.usuarioGuardar;
    //funcion de guardar usuario en la base.
  }
}
