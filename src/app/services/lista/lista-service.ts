import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Lista } from './lista';

export interface Doc {
  name: string,
  full_url: string,
  last_update: Date,
  seed_count: number,
  url: string,
  picture: string
}

@Injectable({
    providedIn: 'root'
})
export class ListaService {

    private apiUrl = 'http://openlibrary.org/people';
    private storageKey = 'mis-listas'

    private listaSubject = new BehaviorSubject<Lista[]>([]);
    listas$ = this.listaSubject.asObservable();

    constructor(private http: HttpClient) { }

    obtenerListasLocales(): Lista []
    {
        const datos =localStorage.getItem(this.storageKey)
        return datos ? JSON.parse(datos) : []
    }

    obtenerListas(): Observable<any> {
        const url = `${this.apiUrl}/george08/lists.json`;

        return this.http.get<{entries: Doc[]}>(url).pipe(
            map(res => res.entries),
            map(docs => {
                return docs.map((doc): Lista => ({
                    id: doc.url.split('/').pop()!,
                    nombre: doc.name,
                    portada: doc.picture,
                    cantidad: doc.seed_count,
                    origen: 'openLibrary',
                    libros : []
                }))
            }))
    }

    obtenerTodasLasListas():Observable<Lista[]>{
        return forkJoin({
            locales: of(this.obtenerListasLocales()),
            openLibrary: this.obtenerListas()
        }).pipe(
            map(resultado => [
                ...resultado.locales,
                ...resultado.openLibrary
            ]),
            tap(listas => {
                console.log('listas', listas)
                this.listaSubject.next(listas)
            })
        )
    }

    crearLista(lista: Lista): Lista{
        const listas = this.obtenerListasLocales();
        listas.push(lista)

        this.guardarListasLocales(listas);

        return lista;
    }

    private guardarListasLocales(listas : Lista[]){
        localStorage.setItem(this.storageKey, JSON.stringify(listas))
    }

    eliminarLista(id : string){
        const listas =  this.obtenerListasLocales()
        .filter(lista => lista.id != id)

        this.guardarListasLocales(listas);
    }
}
