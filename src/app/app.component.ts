
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonButtons, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, bookmarkOutline, bookmarkSharp, bookSharp, heart } from 'ionicons/icons';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import {
  logOutOutline,
  bookOutline,
  listOutline
} from 'ionicons/icons';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList,
    IonMenuToggle, 
    IonItem,
    IonIcon, 
    IonLabel, IonButton,
    IonRouterLink, 
    IonRouterOutlet],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Libros', url: './libros', icon: 'book' },
    { title: 'Listas', url: './listas', icon: 'bookmark' },
  ];
  protected readonly labels = ['Favorites'];
  private router = inject(Router);

async cerrarSesion() {
  try {
    await signOut(auth);
    await this.router.navigateByUrl('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}
  constructor() {
  addIcons({
    'log-out-outline': logOutOutline,
    'book-outline': bookOutline,
    'list-outline': listOutline
  });
}
}
