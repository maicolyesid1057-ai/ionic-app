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
  author_name: string[]
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

    constructor(private http: HttpClient) { }

    obtenerLibros(cantidad: number = 10): Observable<any> {
        const url = `${this.apiUrl}?q=subject:fiction&limit=${cantidad}`;
        return this.http.get<{docs: Doc[]}>(url).pipe(
            map(res => res.docs),
            tap(docs => {
                const newlibros: Libro[] = docs.map((doc): Libro => ({
                    autor: doc.author_name[0],
                    titulo: doc.title || 'Sin título',
                    edicion: doc.first_publish_year || 0,
                    descripcion: doc.author_name[0]
                        ? `Autor: ${doc.author_name.join(', ')}`
                        : 'Autor desconocido',
                    caratula: doc.cover_i
                        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                        : ''
                }))
                this.librosSubject.next(newlibros)
            }))
    }
}
