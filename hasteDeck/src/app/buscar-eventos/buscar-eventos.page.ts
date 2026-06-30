import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonInput, IonToast, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonModal, IonButtons } from '@ionic/angular/standalone';
import { collection, getDocs, query, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { GlobalData } from '../services/global-data';
import { db } from '../../main'; 
@Component({
  selector: 'app-buscar-eventos',
  templateUrl: './buscar-eventos.page.html',
  styleUrls: ['./buscar-eventos.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonToast, IonInput, IonButton, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BuscarEventosPage implements OnInit {

  constructor( private globalData: GlobalData ) { }
  isModalOpen: boolean = false;
  eventoSeleccionado: any = null;
  listaEventos: any[] = [];
  largoLista: number = 0;
  ngOnInit() {
    this.obtenerEventos();
  }

async obtenerEventos() {
    try {
      
      const q = query(collection(db, "evento"), orderBy("fecha", "asc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const datos = doc.data();
        
        this.listaEventos.push({
          id: doc.id,                   
          nombre: datos['nmbEvent'],
          cantidad: datos['cant'],
          ubi: datos['ubicacion'],
          categoria: datos['categoria'],
          descripcion: datos['dspcion'] || 'N/A.',
          fechaTimestamp: datos['fecha'],
          vacantes: datos['asistentes']
        });
      });

    } catch (error) {
      console.error("Error al cargar los eventos desde Firestore: ", error);
    }
  }

  abrirModal(evento: any) {
    this.eventoSeleccionado = evento; 
    this.largoLista = (evento.vacantes || []).length;
    this.isModalOpen = true;          
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.eventoSeleccionado = null;  
    this.largoLista = 0; 
  }

async unirseAlEvento() {

    try {
      const eventoRef = doc(db, 'evento', this.eventoSeleccionado.id);
      const correoAnnadido = this.globalData.globalCorr;
      await updateDoc(eventoRef, {
      
      asistentes: arrayUnion(correoAnnadido.trim())  });
      console.log('¡Te has unido con éxito al evento!', correoAnnadido);

      if (!this.eventoSeleccionado.vacantes) {
        this.eventoSeleccionado.vacantes = [];
      }
      
      if (!this.eventoSeleccionado.vacantes.includes(this.globalData.globalCorr)) {
        this.eventoSeleccionado.vacantes.push(this.globalData.globalCorr);
        this.largoLista = this.eventoSeleccionado.vacantes.length;
      }
      this.cerrarModal();

    } catch (error) {
      console.error('Error al unirse al evento en Firestore:', error);
    }
  }

}
