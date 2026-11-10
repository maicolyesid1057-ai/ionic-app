import { Component, input, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  ModalController
} from '@ionic/angular';

import { Libro } from '../../services/libro/libro';
import { DetalleLibroModalComponent } from '../detalle-libro-modal/detalle-libro-modal.component';

@Component({
  selector: 'app-card-info',
  standalone: true,
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

  private modalController = inject(ModalController);
  libro = input<Libro>();
  botonTitulo = input<string>();
  icono = input<string>();
  accionLibro = output<Libro>();
  eliminarLibro = output<Libro>();
  async abrirDetalle(): Promise<void> {
    const libroActual = this.libro();
    if (!libroActual) return;
    const modal = await this.modalController.create({
      component: DetalleLibroModalComponent,
      componentProps: {
        libro: libroActual
      },
      breakpoints: [0, 0.75, 0.95],
      initialBreakpoint: 0.95
    });
    await modal.present();
  }
  accion(libro: Libro): void {
    this.accionLibro.emit(libro);
  }
  eliminar(libro: Libro): void {
    this.eliminarLibro.emit(libro);
  }
}
