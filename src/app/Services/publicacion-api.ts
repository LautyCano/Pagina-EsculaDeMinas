import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicacionApi {

  urlHost: string = "http://localhost:3000";
  urlBase: string = this.urlHost + "/api/publicaciones/";
  constructor(private http: HttpClient) {}

  getNoticias(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.urlBase, httpOptions);
  }

  getDistinciones(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.urlBase + 'distinciones', httpOptions);
  }

  getPeticiones(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.urlBase + 'peticiones', httpOptions);
  }

  getPublicaciones(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.urlBase + id, httpOptions);
  }

  putModificarPublicacion(id: number, publicacion: any): Observable<any> {
      let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.urlBase + id, publicacion, httpOptions);
  }

  putAprobarPeticion(id: number): Observable<any> {
      let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.urlBase + 'aprobar/' + id, httpOptions);
  }

  postPublicar(publicacion: any): Observable<any> {
    let httpOptions = {
       headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.urlBase, publicacion, httpOptions)
  }

  deletePublicacion(id: number): Observable<any> {
    let httpOptions = {
       headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(this.urlBase + id, httpOptions)
  }
}
