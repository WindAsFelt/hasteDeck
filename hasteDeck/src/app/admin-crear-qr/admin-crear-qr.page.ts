import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, } from '@ionic/angular/standalone';
import { collection, addDoc,query, where, getDocs } from 'firebase/firestore';
import { db } from '../../main';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-admin-crear-qr',
  templateUrl: './admin-crear-qr.page.html',
  styleUrls: ['./admin-crear-qr.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class AdminCrearQrPage implements OnInit {
  nombreX: string = "RX-78-2";
  alertButtons = ['Action'];
  popup: boolean = false;

  constructor() { } 
  ngOnInit() {
  }

  getName: string = ""; 
  getCorr: string = ""; 
  id: string="";
  qrCodeUrl: string = "";

  


  async guardarBD() {
    try {

      const bloque1 = Math.floor(1000 + Math.random() * 9000);
      const bloque2 = Math.floor(1000 + Math.random() * 9000);
      const randID = `${bloque1}-${bloque2}`;
      const docRef = await addDoc(collection(db, "usuario"), {

        correo: this.getCorr,
        nmbUs: this.getName,
        id: randID,
        rol: false
      });
      
      console.log("¡Éxito! Datos guardados con el ID: ", randID);
      
    } catch (error) {
      console.error("Hubo un error al guardar: ", error);
    }
  }

  async leerID() {
    try {
      const q = query(collection(db, "usuario"), where("correo", "==", this.getCorr));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
      
        for (const doc of querySnapshot.docs) {
          const datosUsuario = doc.data();
          this.id = datosUsuario['id'];
          
          this.qrCodeUrl = await QRCode.toDataURL(this.id, { 
            width: 220,
            margin: 1
          });
          
          console.log("¡ID recuperado y QR generado en memoria!");
        }
      } else {
        console.log("No se encontró ningún usuario:");
      }
    } catch (error) {
      console.error("Error al intentar leer o generar QR:", error);
    }
  }

}
