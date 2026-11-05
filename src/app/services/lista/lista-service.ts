import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Lista, ListaCrear } from './lista';
import { Libro } from '../libro/libro';
import { DocLibro } from '../libro/libro-service';

export interface DocList {
  name: string,
  full_url: string,
  last_update: Date,
  seed_count: number,
  url: string,
  picture: string
}

export interface DocListDetalle {
  id: number;
  title: string;
  content: string;
  category: string;
  first_publish_year: number;
  picture: string;
  type: string;
}

@Injectable({
    providedIn: 'root'
})
export class ListaService {

    private apiUrl = 'http://openlibrary.org/people';
    private apiUrlList = 'https://localhost:7259/api/listas'
    private storageKey = 'mis-listas'

    private listaSubject = new BehaviorSubject<Lista[]>([]);
    listas$ = this.listaSubject.asObservable();

    private listaDetalleSubject = new BehaviorSubject<Libro[]>([]);
    detallesLista$ = this.listaDetalleSubject.asObservable();

    constructor(private http: HttpClient) { }

    obtenerListas(): Observable<any> {
        const url = `${this.apiUrl}/miguel_zambrano231/lists.json`;

        return this.http.get<{entries: DocList[]}>(url).pipe(
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
            }),
            tap(list => this.listaSubject.next(list))
        )
    }

    crearLista(lista: ListaCrear): Observable<any>
    {
        return this.http.post(this.apiUrlList, lista)
    }

    private guardarListasLocales(listas : Lista[]){
        localStorage.setItem(this.storageKey, JSON.stringify(listas))
    }

    eliminarLista(id : string){
        
    }

    obtenerListaDetalles(idLista: string): Observable<any>{
        const url = `${this.apiUrl}/george08/lists/${idLista}/seeds.json`;
        return this.http.get<{entries: DocListDetalle[]}>(url).pipe(
            map(respuesta =>
                (respuesta.entries ?? []).map((item: any) =>
                ({
                    autor: 'Consultar información',
                    titulo: item.title || 'Sin título',
                    edicion: item.first_publish_year || 0,
                    descripcion: item.type || '',
                    caratula: item.picture?.url
                        ? `https://${item.picture?.url}`
                        : ''
                }))   
            ),
            tap(detalles => this.listaDetalleSubject.next(detalles))
        )
    }
}
