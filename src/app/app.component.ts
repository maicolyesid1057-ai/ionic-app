
import { Component } from '@angular/core';
import {RouterLink,RouterLinkActive,Router,NavigationEnd} from '@angular/router';
import {IonApp,IonSplitPane,IonMenu,IonContent,IonList,IonMenuToggle,IonItem,IonIcon,IonLabel,IonRouterOutlet, IonButton} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {add,bookmarkOutline,bookmarkSharp,bookOutline,bookSharp,heart,logOutOutline,person,personCircleOutline,trash} from 'ionicons/icons';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink,RouterLinkActive,IonApp,IonSplitPane,IonMenu,IonContent,IonList,IonMenuToggle,IonItem,
    IonIcon,IonLabel,IonRouterOutlet,IonButton],
})
export class AppComponent {
  esLogin = true;
  protected readonly appPages = [
    { title: 'Libros', url: '/libros', icon: 'book' },
    { title: 'Listas', url: '/listas', icon: 'bookmark' },
  ];
  protected readonly labels = ['Favorites'];
  constructor(private router: Router) {
    addIcons({
      bookOutline,
      bookSharp,
      bookmarkOutline,
      bookmarkSharp,
      add,
      heart,
      trash,
      person,
      personCircleOutline,
      logOutOutline
    });
    this.actualizarEstadoMenu(this.router.url);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.actualizarEstadoMenu(event.urlAfterRedirects);
        }
      });
  }
  private actualizarEstadoMenu(url: string): void {
    this.esLogin =
      url === '/' ||
      url.startsWith('/login');
  }
  async cerrarSesion(): Promise<void> {
    try {
      await signOut(auth);
      await this.router.navigateByUrl('/', {
        replaceUrl: true
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
