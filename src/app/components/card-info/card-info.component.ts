import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg
} from '@ionic/angular';

import { Libro } from '../../services/libroservice';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [
    IonCard,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonImg
  ],
})
export class CardInfoComponent {

  @Input() libro!: Libro;

  @Output() agregarLibro = new EventEmitter<Libro>();

  agregar() {

    this.agregarLibro.emit(this.libro);

  }

}