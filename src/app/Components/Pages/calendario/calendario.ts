import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CalendarioService, EventoCalendario } from '../../../Services/calendario-service';
import { SGestionusuarios } from '../../../Services/usuarios-service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {

  diasSemana = signal<string[]>([]);
  nombresMeses = signal<string[]>([]);
  eventos = signal<EventoCalendario[]>([]);
  usuario: any = [];

  constructor(private calendarioService: CalendarioService, private usuarioService: SGestionusuarios, private router: Router) {
    this.diasSemana.set(this.calendarioService.diasSemana);
    this.nombresMeses.set(this.calendarioService.nombresMeses);
    this.eventos.set(this.calendarioService.eventos);
    this.usuario = this.usuarioService.usuarioGuardar;
  }


  // Fecha de hoy (para marcar el día actual)
  hoy = new Date();
  // Mes y año que se están mostrando actualmente
  mesActual = signal(this.hoy.getMonth());
  anioActual = signal(this.hoy.getFullYear());
  // Día que el usuario seleccionó con un click
  diaSeleccionado = signal<number | null>(null);
  // Evento seleccionado para editar
  eventoAEditar = signal<EventoCalendario | null>(null);
  
  /* TÍTULO DEL MES*/
  tituloMes = computed(() =>
    `${this.nombresMeses()[this.mesActual()]} ${this.anioActual()}`
  );

  /* DÍAS DEL MES
    Arma un array con los días del mes actual.
    Los "null" al principio son espacios vacíos para alinear
    el primer día del mes con el día de la semana que corresponde.
  */
  diasDelMes = computed(() => {
    const mes = this.mesActual();
    const anio = this.anioActual();
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);

    const dias: (number | null)[] = [];

    // Espacios vacíos antes del día 1 (para alinear con el día de la semana)
    for (let i = 0; i < primerDia.getDay(); i++) {
      dias.push(null);
    }

    // Días del 1 al último del mes
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(i);
    }

    return dias;
  });

  /* EVENTOS DEL DÍA SELECCIONADO
    Filtra la lista de eventos para mostrar solo los del día
    en que el usuario hizo click.
  */
  eventosDelDia = computed(() => {
    const dia = this.diaSeleccionado();
    if (dia === null) return [];
    const fechaKey = this.formatearFecha(dia);
    return this.eventos().filter((e) => e.fecha === fechaKey); //devuelve todos los eventos que tienen la misma fecha que el dia seleccionado
  });

  /* MÉTODOS AUXILIARES*/

  // Convierte un número de día a formato 'YYYY-MM-DD'
  private formatearFecha(dia: number): string {
    const mes = String(this.mesActual() + 1).padStart(2, '0');
    const anio = this.anioActual();
    const diaStr = String(dia).padStart(2, '0');
    return `${anio}-${mes}-${diaStr}`;
  }

  // Verifica si un día tiene al menos un evento
  tieneEventos(dia: number): boolean {
    return this.eventos().some((e) => e.fecha === this.formatearFecha(dia));
  }

  // Devuelve el tipo del primer evento del día (para poner color)
  tipoEvento(dia: number): string | null {
    const evento = this.eventos().find((e) => e.fecha === this.formatearFecha(dia));
    return evento?.tipo ?? null;
  }

  // Verifica si un día es el día de hoy
  esHoy(dia: number): boolean {
    return (
      dia === this.hoy.getDate() &&
      this.mesActual() === this.hoy.getMonth() &&
      this.anioActual() === this.hoy.getFullYear()
    );
  }

  // Va al mes anterior
  mesAnterior(): void {
    if (this.mesActual() === 0) {
      this.mesActual.set(11);
      this.anioActual.update((a) => a - 1);
    } else {
      this.mesActual.update((m) => m - 1);
    }
    this.diaSeleccionado.set(null);
  }

  // Va al mes siguiente
  mesSiguiente(): void {
    if (this.mesActual() === 11) {
      this.mesActual.set(0);
      this.anioActual.update((a) => a + 1);
    } else {
      this.mesActual.update((m) => m + 1);
    }
    this.diaSeleccionado.set(null);
  }

  // Selecciona un día para ver sus eventos
  seleccionarDia(dia: number): void {
    this.diaSeleccionado.set(dia);
  }

  //Agregar Fecha
  addFecha(){
    const newFecha = document.getElementById('add-fecha') as HTMLInputElement;
    const newTitulo = document.getElementById('add-titulo') as HTMLInputElement;
    const newDescripcion = document.getElementById('add-descripcion') as HTMLInputElement;
    const newTipo = document.getElementById('add-tipo') as HTMLInputElement;
    
    const newEvento: EventoCalendario = {
      fecha: newFecha.value,
      titulo: newTitulo.value,
      descripcion: newDescripcion.value,
      tipo: newTipo.value as any
    }

    this.calendarioService.addEventos(newEvento);
    const toastMessage = document.getElementById('ToastAdd')
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage)
    toastBootstrap.show()
  }

  // Guarda el evento a editar y abre el modal
  editarEvento(evento: EventoCalendario): void {
    this.eventoAEditar.set({ ...evento });
    const modalEl = document.getElementById('editarFechas');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
      (document.getElementById('edit-fecha') as HTMLInputElement).value = evento.fecha;
      (document.getElementById('edit-titulo') as HTMLInputElement).value = evento.titulo;
      (document.getElementById('edit-descripcion') as HTMLInputElement).value = evento.descripcion || '';
      (document.getElementById('edit-tipo') as HTMLSelectElement).value = evento.tipo || '';
    }
  }

  editarFecha() {
    const evento = this.eventoAEditar();
    if (!evento) return;

    const editFecha = document.getElementById('edit-fecha') as HTMLInputElement;
    const editTitulo = document.getElementById('edit-titulo') as HTMLInputElement;
    const editDescripcion = document.getElementById('edit-descripcion') as HTMLInputElement;
    const editTipo = document.getElementById('edit-tipo') as HTMLSelectElement;
    
    const eventoEditado: EventoCalendario = {
      fecha: editFecha.value,
      titulo: editTitulo.value,
      descripcion: editDescripcion.value,
      tipo: editTipo.value as any
    }

    this.calendarioService.updateEventos(evento, eventoEditado);
    this.eventoAEditar.set(null);
    const toastMessage = document.getElementById('ToastEdit')
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage)
    toastBootstrap.show()
  }

  eliminarFecha(evento: EventoCalendario) {
    this.calendarioService.removeEventos(evento);
    const toastMessage = document.getElementById('ToastRemove')
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastMessage)
    toastBootstrap.show()
  }
}
