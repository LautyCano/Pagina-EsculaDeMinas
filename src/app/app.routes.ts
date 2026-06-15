import { Routes } from '@angular/router';
import { Home } from './Components/Pages/home/home';
import { Noticias } from './Components/Pages/noticias/noticias';
import { Historia } from './Components/Pages/historia/historia';
import { Carreras } from './Components/Pages/carreras/carreras';
import { Sedes } from './Components/Pages/sedes/sedes';
import { Inscripcion } from './Components/Pages/inscripcion/inscripcion';
import { Publicaciones } from './Components/Pages/publicaciones/publicaciones';
import { Login } from './Components/Pages/login/login';
import { authGuard } from './Services/auth-service-guard';
import { PracticasProf } from './Components/Pages/practicas-prof/practicas-prof';
import { Calendario } from './Components/Pages/calendario/calendario';
import { HorariosCursos } from './Components/Pages/horarios-cursos/horarios-cursos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'noticias', component: Noticias },
    { path: 'historia', component: Historia },
    { path: 'carreras', component: Carreras },
    { path: 'sedes', component: Sedes },
    { path: 'inscripcion', component: Inscripcion },
    { path: 'publicaciones', component: Publicaciones, canActivate: [authGuard] },
    { path: 'login', component: Login},
    { path: 'practicas-prof', component: PracticasProf },
    { path: 'calendario', component: Calendario },
    { path: 'horarios-cursos', component: HorariosCursos }
];
