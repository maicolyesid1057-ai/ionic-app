import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

private apiUrl = 'https://openlibrary.org/search.json?q=harry+potter';
  constructor(private http: HttpClient) {}

  obtenerLibros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}