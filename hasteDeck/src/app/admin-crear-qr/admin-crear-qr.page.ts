import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonToast, } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { GlobalData } from '../services/global-data';
import { RouterLink } from '@angular/router';
import { db } from '../../main';
@Component({
  selector: 'app-admin-crear-qr',
  templateUrl: './admin-crear-qr.page.html',
  styleUrls: ['./admin-crear-qr.page.scss'],
  standalone: true,
  imports: [RouterLink, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonToast]
})
export class AdminCrearQrPage implements OnInit {
  nombreX: string = "RX-78-2";
  alertButtons = ['Action'];
  popup: boolean = false;
  urlCodigoQR: string | null = null;
  getName: string = ""; 
  getCorr: string = ""; 
  id: string = "";
  
  
  constructor(
    private http: HttpClient,
    private globalData: GlobalData) {}
  ngOnInit() {
  }

  crearQR() {
    const idLocal = this.globalData.globalId; 

    if (idLocal) {
      console.log("ID recuperado desde GlobalData:", idLocal);
      this.contactarQR(idLocal);
      this.id = idLocal;
    } else {
      console.error("No se encontró ningún ID en GlobalData.");
    }
  }

  contactarQR(id: string) {
    if (!id) {
      console.error("No se puede generar el QR porque el ID está vacío.");
      return;
    }

    const linkApi = `https://WindAndLight.pythonanywhere.com/crearQR/${id}`;

    this.http.get(linkApi, { responseType: 'blob' }).subscribe({
      next: (archivoImagen) => {
        this.urlCodigoQR = URL.createObjectURL(archivoImagen);
        console.log("Imagen del QR cargada exitosamente.");
      },
      error: (err) => {
        console.error("Error al conectar con la API de PythonAnywhere:", err);
      }
    });
  }


}
