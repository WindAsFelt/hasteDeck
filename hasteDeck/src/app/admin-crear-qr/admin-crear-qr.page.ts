import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-crear-qr',
  templateUrl: './admin-crear-qr.page.html',
  styleUrls: ['./admin-crear-qr.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminCrearQrPage implements OnInit {
  nombreX: string = "RX-78-2";
  constructor() { } 
  ngOnInit() {
  }

}
