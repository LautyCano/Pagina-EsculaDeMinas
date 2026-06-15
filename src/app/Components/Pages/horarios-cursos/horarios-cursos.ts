import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SGestionusuarios } from '../../../Services/usuarios-service';
import { HorarioService, Materia, HorarioCursos } from '../../../Services/horarios-service';

@Component({
  selector: 'app-horarios-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './horarios-cursos.html',
  styleUrl: './horarios-cursos.css',
})
export class HorariosCursos implements OnInit {

  usuario: any = null;
  horarioForm!: FormGroup;
  materiasTemporales: Materia[] = []; 
  horariosCursos: HorarioCursos[] = [];

  constructor(
    private fb: FormBuilder, 
    public horarioService: HorarioService, 
    private serviceUsuarios: SGestionusuarios
  ) {}

  // EL CICLO DE VIDA DE ANGULAR CARGA LOS DATOS AL INICIAR
  ngOnInit(): void {
    this.initForm();
    this.cargarUsuario();
    this.cargarHorarios();
  }

  // Inicializa el formulario incluyendo los campos sueltos de la materia actual
  initForm() {
    this.horarioForm = this.fb.group({
      curso: ['', Validators.required],
      turno: ['', Validators.required],
      // Campos temporales para la materia que se está escribiendo
      tempNombre: [''],
      tempProfesor: [''],
      tempDia1: [''],
      tempHora1: [''],
      tempDia2: [''],
      tempHora2: [''],
      tempModalidad: ['']
    });
  }

  cargarUsuario() {
    this.usuario = this.serviceUsuarios.usuarioGuardar;
  }

  cargarHorarios() {
    // Usamos el método getter del servicio para traer la lista actualizada
    this.horariosCursos = this.horarioService.getHorarios();
  }

  // Captura los datos directamente desde el Form Reactive sin usar document.getElementById
  agregarMateriaALista() {
    const val = this.horarioForm.value;

    if (!val.tempNombre || !val.tempProfesor || !val.tempDia1 || !val.tempHora1 || !val.tempModalidad) {
      alert('Por favor, completa los campos obligatorios de la materia.');
      return;
    }

    const nuevaMateria: Materia = {
      id: this.materiasTemporales.length + 1,
      nombre: val.tempNombre,
      profesor: val.tempProfesor,
      dia1: val.tempDia1,
      hora1: val.tempHora1,
      dia2: val.tempDia2 || '',
      hora2: val.tempHora2 || '',
      modalidad: val.tempModalidad
    };

    this.materiasTemporales.push(nuevaMateria);
    this.limpiarCamposMateria();
  }

  removerMateriaDeLista(index: number) {
    this.materiasTemporales.splice(index, 1);
    // Reindexamos los IDs de la lista temporal
    this.materiasTemporales.forEach((mat, i) => mat.id = i + 1);
  }

  removeHorario(id: number) {
    this.horarioService.deleteHorario(id);
    this.cargarHorarios();
  }

  editHorario(horario: HorarioCursos){
  //falta esto y ya
  }

  onSubmit() {
    if (this.horarioForm.invalid || this.materiasTemporales.length === 0) return;

    const nuevoHorarioCurso: HorarioCursos = {
      id: 0, // El servicio se encarga de asignarle el ID correcto
      curso: this.horarioForm.value.curso,
      turno: this.horarioForm.value.turno,
      materias: [...this.materiasTemporales] 
    };

    this.horarioService.addHorario(nuevoHorarioCurso);
    
    // Refrescamos la lista local para que impacte en la tabla inmediatamente
    this.cargarHorarios();
    this.limpiarFormulario();
  }

  limpiarCamposMateria() {
    this.horarioForm.patchValue({
      tempNombre: '',
      tempProfesor: '',
      tempDia1: '',
      tempHora1: '',
      tempDia2: '',
      tempHora2: '',
      tempModalidad: ''
    });
  }

  limpiarFormulario() {
    this.horarioForm.reset({ curso: '', turno: '' });
    this.materiasTemporales = [];
    this.limpiarCamposMateria();
  }
}