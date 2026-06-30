
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot, getDoc, collection, query, where, getDocs, Firestore } from 'firebase/firestore';
import { db } from '../../main';
import { GlobalData } from '../services/global-data';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-evento-presente',
  templateUrl: './evento-presente.page.html',
  styleUrls: ['./evento-presente.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class EventoPresentePage implements OnInit, OnDestroy {
  eventoId: string = '';
  datosCombate: any = null;
  esDueno: boolean = false;
  unsubscribeSnapshot: any; 
  esDuenno: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private globalData: GlobalData,
  ) {}

  ngOnInit() {
    this.eventoId = this.route.snapshot.paramMap.get('id') || '';
    
    this.obtenerRolUsuario();
    if (this.eventoId) {
      this.verCombate();
    }
  }

  async obtenerRolUsuario() {
    try {
      if (!this.globalData.globalCorr) {
        this.esDueno = false;
        return;
      }
      
      // Corregido: Usar 'this.db' para mantener consistencia con el constructor
      const usuariosRef = collection(db, 'usuario');
      const q = query(usuariosRef, where('correo', '==', this.globalData.globalCorr.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docUsuario = querySnapshot.docs[0];
        const datosUsuario = docUsuario.data();
        
        // Asigna el valor directamente a la variable que usa el HTML
        this.esDueno = datosUsuario['rol'] === true; 
        console.log('Rol recuperado con éxito. ¿Es dueño?:', this.esDueno);
      } else {
        this.esDueno = false;
      }
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde Firestore:', error);
      this.esDueno = false;
    }
  }

  verCombate() {
    // Corregido: Usar 'this.db' en lugar del import 'db' para evitar conflictos de instancias
    const combateRef = doc(db, 'combate', this.eventoId);

    this.unsubscribeSnapshot = onSnapshot(combateRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        this.datosCombate = docSnapshot.data();
        console.log('Actualización en tiempo real:', this.datosCombate);
      } else {
        console.log('El combate aún no ha sido iniciado por el dueño.');
        this.datosCombate = null;
      }
    });
  }

  ngOnDestroy() {
    // CRÍTICO: Detener el listener al salir de la página
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
    }
  }
}