import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import {IonHeader,IonToolbar,IonTitle,IonButtons,IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonIcon } from '@ionic/angular';

import {
  
  
} from '@ionic/angular/';
import { Libro } from '../../services/libro/libro';


@Component({
  selector: 'app-detalle-libro-modal',
  templateUrl: './detalle-libro-modal.component.html',
  styleUrls: ['./detalle-libro-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class DetalleLibroModalComponent {

  @Input() libro!: Libro;

  private modalController = inject(ModalController);

  cerrarModal() {
    this.modalController.dismiss();
  }
}