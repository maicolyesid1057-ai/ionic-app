import { Component, input, OnInit, output } from '@angular/core';
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
import { Libro } from '../../services/libro';

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
    IonButton
  ],
})
export class CardInfoComponent {

  agregarLibro = output<Libro>();
  libro = input<Libro>();

  constructor() 
  {}

  agregar(libro: Libro){
    this.agregarLibro.emit(libro)
  }
}