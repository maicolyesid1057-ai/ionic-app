import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Libro } from './libro';

export interface DocLibro {
  id: string;
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

    obtenerLibros(cantidad: number = 10, pagina: number = 1): Observable<any> {
        const params = new HttpParams()
            .set('q','subject:fiction')
            .set('page', pagina)
            .set('limit', cantidad);
        
        return this.http.get<{docs: DocLibro[]}>(this.apiUrl, {params}).pipe(
            map(res => res.docs),
            tap(docs => {
                const librosActules = this.librosSubject.value;
                
                const newlibros: Libro[] = docs.map((doc): Libro => ({
                    id: doc.id,
                    autor: doc.author_name[0],
                    titulo: doc.title || 'Sin título',
                    edicion: doc.first_publish_year || 0,
                    caratula: doc.cover_i
                        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                        : ''
                }))
                this.librosSubject.next([...librosActules,...newlibros])
            }))
    }
}
