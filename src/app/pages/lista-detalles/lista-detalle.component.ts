import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { Libro } from "../../services/libro/libro";
import { IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CardInfoComponent } from "../../components/card-info/card-info.component";
import { CommonModule } from "@angular/common";
import { SearchFilterComponent } from "../../components/search-filter/search-filter.component";
import { ListaService } from "../../services/lista/lista-service";

@Component({
    selector: 'app-lista-detalle',
    templateUrl : 'lista-detalle.Component.html',
    styleUrl : 'lista-detalle.component.scss',
    imports: [
        IonTitle,
        IonToolbar,
        FormsModule,
        IonHeader,
        CardInfoComponent,
        IonContent,
        CommonModule,
        IonLabel,
        RouterLink
    ]
})
export class ListaDetalleComponent implements OnInit{
    route = inject(ActivatedRoute)
    listaService = inject(ListaService)
    data$ : Observable<Libro[]>
    busqueda = '';
    nombrelista: string | null = ''

    constructor()
    {
        this.data$ = this.listaService.detallesLista$;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const nombreParam = this.route.snapshot.paramMap.get('nombre');
        this.nombrelista = nombreParam;
        this.listaService.obtenerListaDetalles(id!).subscribe();
    }

    eliminar(libro:Libro){
        
    }
}