import { Component, EventEmitter, input, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonSearchbar } from "@ionic/angular";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  imports: [
    IonSearchbar,
    FormsModule
  ],
})
export class SearchFilterComponent {
  busqueda = model('');

  constructor() 
  {}
}