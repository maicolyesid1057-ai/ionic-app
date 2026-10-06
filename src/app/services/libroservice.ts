import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  titulo: string;
  autor: string;
  edicion: number | null;
  descripcion: string;
  caratula: string;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private apiUrl = 'https://openlibrary.org/search.json';

  private librosGuardados: Libro[] = [];

  constructor(private http: HttpClient) {}

  obtenerLibros(cantidad: number = 10): Observable<any> {

    const url = `${this.apiUrl}?q=subject:fiction&limit=${cantidad}`;

    return this.http.get(url);
  }

  agregarLibro(libro: Libro): void {

    this.librosGuardados.push(libro);

    console.log('Libro guardado:', libro);
    console.log('Libros guardados:', this.librosGuardados);

  }

  obtenerLibrosGuardados(): Libro[] {

    return this.librosGuardados;

  }

}