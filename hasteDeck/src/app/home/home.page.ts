import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonToast, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink} from '@ionic/angular/standalone';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { collection, addDoc,query, where, getDocs, Timestamp, orderBy, updateDoc } from 'firebase/firestore';
import { GlobalData } from '../services/global-data';
import { db } from '../../main';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonToast, RouterModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterLink],
})
export class HomePage {

  constructor(
    public globalData: GlobalData)
    {}
    nombreX = this.globalData.globalName;
  
  
  ngOnInit() {}

  async leerQR() {
    const usuariosRef = collection(db, 'usuario');
    const q = query(usuariosRef, where('correo', '==', this.globalData.globalCorr.trim()));
    const querySnapshot = await getDocs(q);
    const docUsuario = querySnapshot.docs[0];
    
    try {
      const status = await BarcodeScanner.requestPermissions();
      if (status.camera !== 'granted') {
        console.error('Permiso de cámara denegado');
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        const idDetectado = barcodes[0].displayValue; 
        console.log('ID escaneado con éxito:', idDetectado);

        await updateDoc(docUsuario.ref, {
        idTienda: idDetectado 
    });
      }

    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }
}