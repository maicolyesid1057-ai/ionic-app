
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline, bookmarkSharp, bookOutline, bookSharp } from 'ionicons/icons';

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
    IonLabel, 
    IonRouterLink, 
    IonRouterOutlet],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Libros', url: './folder/libros', icon: 'book' },
    { title: 'Listas', url: './folder/listas', icon: 'bookmark' },
  ];
  protected readonly labels = ['Favorites'];
  constructor() {
    addIcons({ bookOutline, bookSharp, bookmarkOutline, bookmarkSharp });
  }
}
