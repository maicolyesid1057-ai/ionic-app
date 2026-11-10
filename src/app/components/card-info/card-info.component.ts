import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonIcon } from '@ionic/angular';
import { Libro } from '../../services/libro/libro';

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
    IonButton,
    IonIcon
],
})
export class CardInfoComponent {

  agregarLibro = output<Libro>();
  eliminarLibro = output<Libro>();
  libro = input<Libro>();
  botonTitulo = input<string>("Agregar");

  constructor() 
  {}

  agregar(libro: Libro){
    this.agregarLibro.emit(libro)
  }

  eliminar(libro: Libro){
    this.eliminarLibro.emit(libro)
  }
}