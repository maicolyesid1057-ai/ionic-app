import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Lista, ListaCrear } from "../../services/lista/lista";
import { AsyncPipe } from "@angular/common";
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonList, IonItem, IonIcon, IonAvatar, IonFab, IonFabButton, IonModal, IonLabel, IonButtons, IonMenuButton, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/angular";
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
    IonList, IonMenuButton,
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
    IonButtons,
    IonButtons,
    IonItemSliding,
    IonItemOption,
    IonItemOptions
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

    crear(lista : ListaCrear) {
        this.listaService.crearLista(lista).subscribe({
            next: respuesta =>{
                this.cargarListas();
            },
            error : err => 
                console.error('error creacion lista', err)
        });
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

    detalles(lista: Lista ){
        this.router.navigate(['listas/detalle', lista.id, lista.nombre ]);
    }

    eliminar(lista: Lista){
        this.listaService.eliminarLista(lista.id).subscribe({
            next :()=> {
                this.showMessage('Lista eliminada correctamente')
                this.cargarListas();
            },
            error: () => 
                this.showMessage('No se pudo eliminar la lista'),
        });
        
    }
}
