import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Lista } from "../../services/lista/lista";
import { AsyncPipe } from "@angular/common";
import { InfiniteScrollCustomEvent,
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonTitle,
    IonToolbar,
    ToastController,IonApp,
    IonMenu,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonAvatar,
    IonFab,
    IonFabButton,
     IonModal,
    IonLabel,
    IonButtons,
    IonMenuToggle,
    IonSplitPane,IonMenuButton,
    IonRouterOutlet } from "@ionic/angular";
import { SearchFilterComponent } from "../../components/search-filter/search-filter.component";
import { ListaService } from "../../services/lista/lista-service";
import { CrearListaComponent } from "../../components/crear-lista/crear-lista.component";

@Component({
    selector: 'app-listas',
    templateUrl: './listas-page.Component.html',
    styleUrl: './listas-page.component.scss',
    imports: [
    AsyncPipe,
    IonList,IonMenuButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    SearchFilterComponent,
    IonLabel,
    IonAvatar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    CrearListaComponent,
    IonButton,
    IonButtons,
    IonButtons
]
})
export class ListasPageComponent implements OnInit {
    listaService = inject(ListaService)
    toastController =  inject(ToastController);
    listas: Lista[] = []

    busqueda = '';
    showMenu = false;

    @ViewChild(IonModal) modal!: IonModal;

    message = '';
    name!: string;
    data$ : Observable<Lista[]>

    constructor() 
    {
        this.data$ = this.listaService.listas$;
    }

    ngOnInit(): void {
        this.cargarListas();
    }

    cargarListas():void{
        this.listaService.obtenerTodasLasListas().subscribe();
    }

    cancel() {
        this.modal.dismiss(null, 'cancel');
    }

    confirm(lista : Lista) {
        this.listaService.crearLista(lista);
        this.cargarListas();
        this.modal.dismiss(this.name, 'confirm');
    }

    async showMessage(message: string){
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'top',
        });
        await toast.present();
    }
}
