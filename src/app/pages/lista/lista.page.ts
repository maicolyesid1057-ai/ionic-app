import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libroservice';
import { Libro } from '../../services/libro';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg
  ]
})
export class ListaPage implements OnInit {

  libros: Libro[] = [];

  constructor(
    private librosService: LibrosService
  ) {}

  ngOnInit(): void {

    this.libros = this.librosService.obtenerLibrosGuardados();

    console.log('Libros en lista:', this.libros);
  }
}