import { Component, OnInit, AfterViewInit, HostListener, QueryList, ElementRef, ViewChildren, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sedes',
  imports: [CommonModule],
  templateUrl: './sedes.html',
  styleUrl: './sedes.css',
})
export class Sedes implements AfterViewInit {

  sedes = [
    {
      titulo: 'Sede Jujuy Capital',
      imagen: '/img/colegio-de-minas.webp',
      descripcion: 'La Escuela de Minas "Dr. Horacio Carrillo", dependiente de la Universidad Nacional de Jujuy (UNJu), es una de las instituciones educativas de nivel secundario más prestigiosas y con mayor tradición tecnológica de la provincia.\n\n Fundada originalmente con un fuerte perfil técnico enfocado en la minería y la industria regional, la escuela se transformó en un pilar clave para la formación de profesionales en San Salvador de Jujuy. Combina una altísima exigencia académica con una formación humana e integral.',
    },
    {
      titulo: 'Sede La Quiaca',
      imagen: '/img/sede_quiaca.png',
      descripcion: 'Se inauguró oficialmente la Sede La Quiaca de la Escuela de Minas \n\n En un sencillo pero emotivo acto, la Universidad Nacional de Jujuy (UNJu) dejó inaugurada oficialmente la sede de la Escuela de Minas Dr. Horacio Carrillo en la ciudad de la Quiaca. La institución viene desarrollando actividades académicas en dicha sede desde el mes de abril último, con el dictado del primer año del secundario de la casa de estudios jujeña.\n\n En la oportunidad, el Rector de la UNJu, Lic. Rodolfo Tecchi, mantuvo una charla con los estudiantes que están cursando el primer año. El funcionario académico informó que los docentes están trabajando con los ingresantes para el periodo 2018, asi como también con la selección de los nuevos docentes que se incorporaran al establecimiento a partir de la puesta en marcha del segundo año. \n\nTecchi agregó que nos hemos comprometido con la ciudad de La Quiaca a incrementar la infraestructura de la Sede, y además el gobierno provincial ha dado recursos al municipio para continuar con la construcción de un nuevo sector de aulas, por lo que seguramente el año próximo estaremos implementando algunas de las carreras universitarias de grado y de pregrado también en La Quiaca. Además, el Rector señaló que después de más de 400 años de existencia de una de las universidades más antiguas, como es la universidad de Córdoba, finalmente podemos decir que la Universidad pública, estatal y gratuita de la República Argentina está presente desde La Quiaca hasta Ushuaia.\n\n En la ocasión, Tecchi comentó que se está cumpliendo con una distribución más equitativa de las acciones de la Universidad en toda la geografía de la provincia, porque no solo se están implementando nuevas carreras, sino que también estamos conformando nuevas unidades de investigación y de extensión. Ante cualquier consulta dirigirse a la calle República Árabe Siria esq 25 de Mayo. Encargada de la sede Prof. Julieta Ursagaste.'
    },
    {
      titulo: 'Sede Yuto',
      imagen: '/img/sedeYuto.webp',
      descripcion: 'Se realizó la Apertura de la Sede Yuto de la Escuela de Minas “Dr. Horacio Carrillo"\n\n Ceremonia realizada en el Salón Parroquial de la localidad. Convocando una gran cantidad de asistentes a esta ceremonia presidida por el Sr. Rector de la Universidad Nacional de Jujuy Lic. Rodolfo Tecchi, la Sra. Senadora Nacional Silvia Giacoppo, el Sr. Intendente Alfredo Valdiviezo, el Sr. Secretario Académico de la Unju Mg. Ing. Agr. Mario Bonillo, el Cura Párroco de la localidad Pbro. Antonio Gabrieli, el Sr. Director de la Escuela Lic. Fernando Sueiro y Sueiro, El Encargado de Sede Lic. Pablo Torres, representantes del Consejo Deliberante de Yuto, Coordinadores de la Escuela de Minas Lic. Laura Mastrandrea y Prof. Edgardo Balanza Ruggeri, el Encargado de Personal de la Esc. de Minas Sr. Oscar Mancilla, invitados especiales, padres y madres de los ingresantes y nuestros nuevos estudiantes.\n\n Se realizó la firma del convenio de Cooperación Mutua y Financiamiento entre el Municipio de Yuto y la Universidad Nacional de Jujuy.\n\n La Escuela de Minas Sede Yuto funciona en la calle Mitre S/N en el salón parroquial al lado de la parroquia principal que está frente de la plaza central Hipólito Yrigoyen. El encargado de la sede es el Lic. Pablo Torres.',
    }
  ];

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
