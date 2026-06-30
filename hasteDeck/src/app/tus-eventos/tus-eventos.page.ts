import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonRouterLink, IonButtons, IonModal } from '@ionic/angular/standalone';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../main';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { GlobalData } from '../services/global-data';
@Component({
  selector: 'app-tus-eventos',
  templateUrl: './tus-eventos.page.html',
  styleUrls: ['./tus-eventos.page.scss'],
  standalone: true,
  imports: [IonModal, IonButtons,  RouterLink, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink]
})
export class TusEventosPage implements OnInit {
  tusEventos: any[] = [];
  isModalOpen: boolean = false;
  eventoSeleccionado: any = null;
  listaEventos: any[] = [];
  largoLista: number = 0;
  tiempoRestante: string = '';
  intervalTimer: any;
  popup: boolean = false;
  eventoListo: boolean = false;
  popupConfirmar: boolean = false;

  constructor(private globalData: GlobalData) { }

  ngOnInit(
  ) {
    this.eventosCreados();
  }

async eventosCreados() {
    if (!this.globalData.globalId) {
      console.warn('No hay un ID de usuario en GlobalData para filtrar.');
      return;
    }
      const eventosRef = collection(db, 'evento');
      const q = query(eventosRef, where('id', '==', this.globalData.globalId.trim())
      );
      const querySnapshot = await getDocs(q);
      this.tusEventos = []; 
      querySnapshot.forEach((doc) => {
        const datos = doc.data();        
        this.tusEventos.push({
          id: doc.id,                  
          nombre: datos['nmbEvent'],
          cantidad: datos['cant'],
          ubi: datos['ubicacion'],
          categoria: datos['categoria'],
          descripcion: datos['dspcion'] || 'N/A.',
          fechaTimestamp: datos['fecha'],
          vacantes: datos['asistentes'] || []
        });
      });
      console.log('Eventos creados cargados:', this.tusEventos.length);
  }

conteoTiempo() {
    const fechaDestino = this.eventoSeleccionado.fechaTimestamp.toDate().getTime();

    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
    this.intervalTimer = setInterval(() => {
      const ahora = new Date().getTime();
      const restante = fechaDestino - ahora;

      const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((restante % (1000 * 60)) / 1000);

      if (restante < 0) {
        clearInterval(this.intervalTimer);
        this.tiempoRestante = '¡El evento ya ha comenzado!';
        this.eventoListo = true; // El contador llegó a 0
        return;
      }

      this.tiempoRestante = `${horas}h ${minutos}m ${segundos}s`;
    }, 1000);
  }


async eliminarEvento(eventoId: string) {
    const eventoRef = doc(db, 'evento', eventoId);
    await deleteDoc(eventoRef);
    this.listaEventos = this.listaEventos.filter(e => e.id !== eventoId);
}
confirmarCierre() {
  if (this.eventoSeleccionado && this.eventoSeleccionado.id) {
    this.eliminarEvento(this.eventoSeleccionado.id);
  }
  this.popup = false;
  this.cerrarModal();
}

abrirModal(evento: any) {
  this.eventoSeleccionado = evento; 
  this.largoLista = (evento.vacantes || []).length;
  this.isModalOpen = true;       
  this.conteoTiempo();   
  }

cerrarModal() {
  this.isModalOpen = false;
  this.eventoSeleccionado = null;  
  this.largoLista = 0; 
  this.eventoSeleccionado = null; 
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
  }
}