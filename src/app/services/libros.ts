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

constructor(private http: HttpClient) {}

obtenerLibros(cantidad: number = 100): Observable<any> {

const url = `${this.apiUrl}?q=subject:fiction&limit=${cantidad}`;

return this.http.get(url);

}
}
