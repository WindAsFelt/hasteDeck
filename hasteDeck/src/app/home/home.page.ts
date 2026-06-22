import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardContent, IonButton, IonCard, IonCardTitle, IonCardSubtitle, IonIcon, IonRouterLink, IonButtons, IonTabButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTabButton, RouterModule, IonButtons, IonIcon, IonCardSubtitle, IonCardTitle, IonCard, IonButton, IonCardContent, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterLink],
})
export class HomePage {

  nombreX: string = "RX-78-2";
  
  constructor() {}
}


