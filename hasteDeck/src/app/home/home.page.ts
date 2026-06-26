import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonToast, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonToast, RouterModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterLink],
})
export class HomePage {

  nombreX: string = "RX-78-2";
  
  constructor() {}
}


