import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonTitle, ToastController } from '@ionic/angular';

interface Libro {
  titulo: string,
  edicion: number,
  descripcion: string
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
    IonButton,
    IonIcon
  ],
})
export class CardInfoComponent {

  busqueda = '';
  libros = [
    {
      titulo : "Cien años de soledad",
      edicion: 2005,
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      caratula : "https://ellector.com.pa/cdn/shop/files/cien-anos-de-soledad.webp?v=1731690530&width=1100"
    },
    // {
    //   titulo : "Pedro Paramo",
    //   edicion: 1998,
    //   descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    //   caratula : "https://tse3.mm.bing.net/th/id/OIP.FyynGSNm5i7R8gR44IG5GQHaKx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    // },
    // {
    //   titulo : "Rayuela",
    //   edicion: 2012,
    //   descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    //   caratula : "https://tse1.mm.bing.net/th/id/OIP.pofIz0EoNTv4C7osR4QUdQHaMY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    // },
    // {
    //   titulo : "Rayuela",
    //   edicion: 2012,
    //   descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    //   caratula : "https://tse1.mm.bing.net/th/id/OIP.pofIz0EoNTv4C7osR4QUdQHaMY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    // }
  ]

  constructor(private toastController: ToastController) {}

  async agregar(libro:Libro){
    const toast = await this.toastController.create({
      message:  `${libro.titulo} agregado!`,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}
