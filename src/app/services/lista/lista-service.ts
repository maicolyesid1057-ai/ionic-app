import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Lista, ListaCrear } from './lista';
import { Libro } from '../libro/libro';

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
    http = inject(HttpClient)
    private apiUrl = 'http://openlibrary.org/people';
    private apiUrlList = 'https://openlibraryapi-f3ghbxe3gtatfcb3.westus3-01.azurewebsites.net/api/listas';
  //  private apiUrlList = 'https://localhost:7259/api/listas'

    private listaSubject = new BehaviorSubject<Lista[]>([]);
    listas$ = this.listaSubject.asObservable();

    private listaDetalleSubject = new BehaviorSubject<Libro[]>([]);
    detallesLista$ = this.listaDetalleSubject.asObservable();

    constructor() { }

    obtenerListas(): Observable<Lista[]> {
        const url = `${this.apiUrlList}`;

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

    eliminarLista(id : string){
        
    }

    agregarLibro(listaId: string, libroKey: string){
        return this.http.post(`${this.apiUrlList}/${encodeURIComponent(listaId)}`,{
            key: libroKey
        },
        {
            responseType: 'text'
        })
    }

    obtenerListaDetalles(idLista: string): Observable<any>{
        const url = `${this.apiUrlList}/${idLista}/libros`;
        return this.http.get<{entries: DocListDetalle[]}>(url).pipe(
            map(respuesta =>
                (respuesta.entries ?? []).map((item: any) =>
                ({
                    id: item.id, 
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
