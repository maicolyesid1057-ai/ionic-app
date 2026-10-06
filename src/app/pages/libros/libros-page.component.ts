import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LibrosService, Libro } from '../../services/libroservice';

import { CardInfoComponent } from '../../components/card-info/card-info.component';

import {
    IonContent,
    IonHeader,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    ToastController
} from '@ionic/angular';


@Component({
    selector: 'libros',
    templateUrl: './libros-page.component.html',
    styleUrls: ['./libros-page.component.scss'],
    imports: [
        IonSearchbar,
        IonTitle,
        IonToolbar,
        FormsModule,
        IonHeader,
        CardInfoComponent,
        IonContent
    ],
})
export class LibrosPageComponent implements OnInit {

    busqueda = '';

    libros: Libro[] = [];

    constructor(
        private toastController: ToastController,
        private librosService: LibrosService
    ) { }


    recibirLibro(libro: Libro) {

        console.log('Libro recibido:', libro);

        this.librosService.agregarLibro(libro);

    }


    ngOnInit() {

        this.librosService.obtenerLibros().subscribe({

            next: (respuesta) => {

                console.log('respuesta', respuesta);

                this.libros = respuesta.docs.map((libro: any) => ({

                    titulo: libro.title || 'Sin título',

                    autor: libro.author_name
                        ? libro.author_name.join(', ')
                        : 'Autor desconocido',

                    edicion: libro.first_publish_year || null,

                    descripcion: libro.author_name
                        ? `Autor: ${libro.author_name.join(', ')}`
                        : 'Autor desconocido',

                    caratula: libro.cover_i
                        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
                        : ''

                }));

                console.log('libros', this.libros);

            },

            error: (error) => {

                console.error('ERROR:', error);

            }

        });

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