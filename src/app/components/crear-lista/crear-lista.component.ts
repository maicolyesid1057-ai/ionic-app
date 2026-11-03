import { Component, output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from "@ionic/angular";
import { Lista } from "../../services/lista/lista";

@Component({
    selector :'app-crear-lista',
    templateUrl :'crear-lista.component.html',
    styleUrls: [],
    imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonTitle,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
]
})
export class CrearListaComponent{
    private fb = new FormBuilder();
    
    cancelar = output()
    confirmar = output<Lista>()

    listaForm = this.fb.group({
        nombre: [null, Validators.required],
        descripcion: [null, Validators.required]
    })

    constructor()
    {}

    cancel(){
        this.cancelar.emit()
    }

    confirm(){
        if(this.listaForm.invalid){
            this.listaForm.markAllAsTouched();
            return;
        }

        var nuevaLista : Lista = {
            id: Date.now.toString(),
            descripcion : this.listaForm.controls["descripcion"].value!,
            nombre: this.listaForm.controls["nombre"].value!,
            cantidad: 0,
            libros: [],
            origen: 'local'
        }
        this.confirmar.emit(nuevaLista)
    }
}