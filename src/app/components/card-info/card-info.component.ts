import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular';

import { LibrosService } from '../../services/libros';

interface Libro {
  titulo: string;
  edicion: number;
  descripcion: string;
  caratula: string;
}

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [
    IonCard,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    FormsModule,
    IonButton,
    IonImg,
    IonContent,
    IonHeader,
    IonSearchbar,IonButton
  ],
})
export class CardInfoComponent implements OnInit {

  busqueda = '';

  libros: Libro[] = [];

  constructor(
    private toastController: ToastController,
    private librosService: LibrosService
  ) {}

  ngOnInit() {
  this.librosService.obtenerLibros().subscribe({
    next: (respuesta) => {

      console.log('RESPUESTA COMPLETA:', respuesta);
      console.log('DOCS:', respuesta.docs);
      console.log('PRIMER LIBRO:', respuesta.docs[0]);

      this.libros = respuesta.docs.map((libro: any) => ({
        titulo: libro.title || 'Sin título',
        edicion: libro.first_publish_year || 0,
        descripcion: libro.author_name
          ? `Autor: ${libro.author_name.join(', ')}`
          : 'Autor desconocido',
        caratula: libro.cover_i
          ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
          : ''
      }));

      console.log('LIBROS PARA MOSTRAR:', this.libros);
      console.log('CANTIDAD:', this.libros.length);
    },

    error: (error) => {
      console.error('ERROR:', error);
    }
  });
  
}
async agregar(libro:Libro){
    const toast = await this.toastController.create({
      message:  `${libro.titulo} agregado!`,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}