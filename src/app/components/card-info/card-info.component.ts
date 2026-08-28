import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonTitle } from '@ionic/angular';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [IonCard,IonTitle,IonCardContent],
})
export class CardInfoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
