import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DetalleLibroModalComponent } from '../../components/detalle-libro-modal/detalle-libro-modal.component';
import { InfiniteScrollCustomEvent, IonContent, IonMenuButton, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonTitle, IonToolbar, ToastController, IonApp, IonMenu, IonList, IonItem, IonIcon, IonButtons, IonButton, IonLabel, IonMenuToggle, IonSplitPane, IonRouterOutlet, IonActionSheet, ActionSheetController } from '@ionic/angular';
import { LibrosService } from '../../services/libro/libro-service';
import { CardInfoComponent } from "../../components/card-info/card-info.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Libro } from '../../services/libro/libro';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';
import { Lista } from '../../services/lista/lista';
import { ListaService } from '../../services/lista/lista-service';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Router } from '@angular/router';


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
        IonButtons,
        IonInfiniteScrollContent,
        IonMenuButton
    ],
})
export class LibrosPageComponent implements OnInit {
    actionSheetCtrl = inject(ActionSheetController);
    toastController = inject(ToastController);
    librosService = inject(LibrosService);
    listaService = inject(ListaService);
    busqueda = '';
    paginaActual = 1;
    cantidadPorPagina = 10;
    libros: Libro[] = [];
    totalLibros = 0;
    hayMasLibros = true;
    cargando = false;


    data$: Observable<Libro[]>;
    listas: Lista[] = [];
    private modalController = inject(ModalController);
    private router = inject(Router);


    constructor() {
        this.data$ = this.librosService.libros$;
    }

    ngOnInit() {
        this.cargarPagina(1);
        this.listaService.obtenerListas().subscribe({
            next: listas => {
                this.listas = listas
            }
        });
    }
    async abrirDetalle(libro: Libro) {
    const modal = await this.modalController.create({
        component: DetalleLibroModalComponent,
        componentProps: {
            libro: libro
        },
        breakpoints: [0, 0.75, 0.95],
        initialBreakpoint: 0.95
    });

    await modal.present();
}

    async agregar(libro: Libro) {
        const actionSheet = await this.actionSheetCtrl.create({
            subHeader: 'Selecciona una lista',
            buttons: [...this.listas.map(lista =>
            ({
                text: lista.nombre,
                handler: async () => {
                    this.listaService.agregarLibro(lista.id, libro.id).subscribe()
                    const toast = await this.toastController.create({
                        message: `${libro.titulo} agregado!`,
                        duration: 1500,
                        position: 'top',
                    });
                    await toast.present();
                }
            }))
                ,
            {
                text: 'Cancelar',
                role: 'cancel'
            }
            ]
        })

        await actionSheet.present();
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
                    this.hayMasLibros = nuevosLibros.length === this.cantidadPorPagina;
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