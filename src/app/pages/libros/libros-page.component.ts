import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    InfiniteScrollCustomEvent,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonTitle,
    IonToolbar,
    ToastController
} from '@ionic/angular';

import { LibrosService } from '../../services/libro/libro-service';
import { CardInfoComponent } from "../../components/card-info/card-info.component";
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Libro } from '../../services/libro/libro';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';

@Component({
    selector: 'app-libros',
    templateUrl: './libros-page.component.html',
    styleUrls: ['./libros-page.component.scss'],
    imports: [
    IonTitle,
    IonToolbar,
    FormsModule,
    IonHeader,
    CardInfoComponent,
    IonContent,
    CommonModule,
    SearchFilterComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
],
})
export class LibrosPageComponent implements OnInit {

    busqueda = '';
    toastController =  inject(ToastController);
    librosService =  inject(LibrosService);
    paginaActual = 1;
    cantidadPorPagina = 10;
    libros: Libro[] = [];
    totalLibros = 0;
    hayMasLibros = true;
    cargando = false;
    private subscription = new Subscription();

    data$ : Observable<Libro[]>;

    constructor() 
    {
        this.data$ = this.librosService.libros$;
    }

    ngOnInit() {
        this.subscription.add(
            this.librosService.libros$.subscribe(libros => {
                this.libros = libros;
            })
        )
        this.cargarPagina(1);
    }

    async agregar(libro: Libro) {
        const toast = await this.toastController.create({
            message: `${libro.titulo} agregado!`,
            duration: 1500,
            position: 'top',
        });
        await toast.present();
    }

    cargarMasLibros(event: InfiniteScrollCustomEvent) {
        if (this.cargando || !this.hayMasLibros) {
            event.target.complete();
            return;
        }

        this.paginaActual++;
        this.cargarPagina(this.paginaActual, event);
    }

    private async cargarPagina(
        pagina: number,
        event?: InfiniteScrollCustomEvent
    ) {
        this.cargando = true;

        this.librosService
            .obtenerLibros(this.cantidadPorPagina, pagina)
            .subscribe({
                next: (nuevosLibros) => {
                    this.paginaActual = pagina;
                    this.hayMasLibros = nuevosLibros.length == this.cantidadPorPagina;

                    this.cargando = false;

                    event?.target.complete();
                },
                error: (error) => {
                    console.error('Error loading books:', error);
                    this.cargando = false;

                    event?.target.complete();
                }
            });
        }
}