import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ToastController
} from '@ionic/angular';

import { LibrosService } from '../../services/libroservice';
import { CardInfoComponent } from "../../components/card-info/card-info.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Libro } from '../../services/libro';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';

@Component({
    selector: 'libros',
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
    SearchFilterComponent
],
})
export class LibrosPageComponent implements OnInit {

    busqueda = '';
    toastController =  inject(ToastController);
    librosService =  inject(LibrosService);

    data$: Observable<Libro[]>;

    constructor(
    ) { 
        this.data$ = this.librosService.libros$;
    }

    ngOnInit() {
        this.librosService.obtenerLibros().subscribe();
    }

    async agregar(libro: Libro) {
        const toast = await this.toastController.create({
            message: `${libro.titulo} agregado!`,
            duration: 1500,
            position: 'top',
        });
        await toast.present();
    }
}