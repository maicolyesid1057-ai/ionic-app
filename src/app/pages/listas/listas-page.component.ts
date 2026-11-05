import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Lista, ListaCrear } from "../../services/lista/lista";
import { AsyncPipe } from "@angular/common";
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonAvatar, IonFab, IonFabButton, IonIcon, IonModal, ToastController } from "@ionic/angular";
import { SearchFilterComponent } from "../../components/search-filter/search-filter.component";
import { ListaService } from "../../services/lista/lista-service";
import { CrearListaComponent } from "../../components/crear-lista/crear-lista.component";
import { Router } from "@angular/router";

@Component({
    selector: 'app-listas',
    templateUrl: './listas-page.Component.html',
    styleUrl: './listas-page.component.scss',
    imports: [
    AsyncPipe,
    IonList,
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
]
})
export class ListasPageComponent implements OnInit {
    router = inject(Router)
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
        this.listaService.obtenerListas().subscribe();
    }

    cancel() {
        this.modal.dismiss(null, 'cancel');
    }

    confirm(lista : ListaCrear) {
        this.listaService.crearLista(lista).subscribe({
            next: respuesta =>
                console.log('respuesta creacion lista', respuesta)
            ,
            error : err => 
                console.error('error creacion lista', err)
        });
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

    detalles(listaId: string ){
        this.router.navigate(['listas/detalle', listaId]);
    }
}
