import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from '@ionic/angular';

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
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    FormsModule,
    IonImg,
  ],
})
export class CardInfoComponent {

  busqueda = '';
  libro = input.required<Libro>();

  constructor() 
  {}
}