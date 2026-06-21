import { Component, OnInit, AfterViewInit, HostListener, QueryList, ElementRef, ViewChildren, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionApi } from '../../../Services/publicacion-api';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements AfterViewInit {

  noticias: any[] = [];
  distinciones: any[] = [];

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

  constructor(public apiPublicaciones: PublicacionApi,
    private cdr: ChangeDetectorRef) {
    this.getNoticias();
    this.getDistinciones();
  }  
  /** Categoría seleccionada actualmente en el filtro */
  selectedCategory = signal<string>('all');

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Ejecutar reveal inicial por si los elementos ya son visibles al cargar
    this.checkReveal();
  }

  /** Escucha el scroll de la ventana para activar animaciones reveal */
  @HostListener('window:scroll')
  onScroll(): void {
    this.checkReveal();
  }

  private checkReveal(): void {
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementVisible = 150;

    this.revealElements?.forEach((elRef) => {
      const el = elRef.nativeElement as HTMLElement;
      const elementTop = el.getBoundingClientRect().top + scrollTop;
      if (elementTop < scrollTop + windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }

  /** Maneja el cambio de categoría desde los radio buttons */
  onCategoryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedCategory.set(input.value);
  }

  /** Devuelve true si el item debe mostrarse según la categoría seleccionada */
  isVisible(itemCategory: string): boolean {
    const cat = this.selectedCategory();
    return cat === 'all' || itemCategory === cat;
  }
}
