import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Libro } from './libro';

export interface Doc {
  id: number;
  title: string;
  content: string;
  category: string;
  first_publish_year: number;
  author_name: string[];
  tags: string[];
  cover_i: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private apiUrl = 'https://openlibrary.org/search.json';

  private librosSubject = new BehaviorSubject<Libro[]>([]);

  libros$ = this.librosSubject.asObservable();

  private librosGuardados: Libro[] = [];

  constructor(private http: HttpClient) {}

  obtenerLibros(cantidad: number = 10): Observable<Libro[]> {

    const url = `${this.apiUrl}?q=subject:fiction&limit=${cantidad}`;

    return this.http.get<{ docs: Doc[] }>(url).pipe(

      map((res: { docs: Doc[] }) => {

        return res.docs.map((doc: Doc): Libro => ({

          autor: doc.author_name?.[0] || 'Autor desconocido',

          titulo: doc.title || 'Sin título',

          edicion: doc.first_publish_year || 0,

          descripcion: doc.author_name?.length
            ? `Autor: ${doc.author_name.join(', ')}`
            : 'Autor desconocido',

          caratula: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : ''

        }));

      }),

      tap((libros: Libro[]) => {

        this.librosSubject.next(libros);

      })

    );
  }

  guardarLibro(libro: Libro): void {

    this.librosGuardados.push(libro);

    console.log('Libro guardado:', libro);
    console.log('Lista de libros guardados:', this.librosGuardados);
  }

  obtenerLibrosGuardados(): Libro[] {

    return this.librosGuardados;
  }
}