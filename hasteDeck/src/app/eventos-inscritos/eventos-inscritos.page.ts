import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal } from '@ionic/angular/standalone';
import { collection, query, where, getDocs, orderBy, updateDoc, arrayRemove, doc } from 'firebase/firestore';
import { db } from '../../main';
import { RouterLink } from '@angular/router';
import { GlobalData } from '../services/global-data';
@Component({
  selector: 'app-eventos-inscritos',
  templateUrl: './eventos-inscritos.page.html',
  styleUrls: ['./eventos-inscritos.page.scss'],
  standalone: true,
  imports: [ RouterLink, IonModal, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventosInscritosPage implements OnInit {
  listaInscritos: any[] = [];
  tiempoRestante: string = '';
  intervalTimer: any;
  isModalOpen: boolean = false;
  eventoSeleccionado: any = null;
  listaEventos: any[] = [];
  largoLista: number = 0;

  
  constructor(private globalData: GlobalData) { }

  ngOnInit() {
    this.obtenerEventosInscritos();
  }

  async obtenerEventosInscritos() {
    if (!this.globalData.globalCorr) {
      console.warn('No hay un correo de usuario en GlobalData para filtrar.');
      return;
    }

      const eventosRef = collection(db, 'evento');
      const q = query(
        eventosRef, 
        where('asistentes', 'array-contains', this.globalData.globalCorr.trim())
      );

      const querySnapshot = await getDocs(q);
      this.listaInscritos = []; 

      querySnapshot.forEach((doc) => {
        const datos = doc.data();
        
        this.listaInscritos.push({
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
      console.log('Eventos en los que estás inscrito cargados:', this.listaInscritos.length);
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
        return;
      }

      this.tiempoRestante = `${horas}h ${minutos}m ${segundos}s`;
    }, 1000);
  }
async salirEvento(evento: any) {

    const eventoRef = doc(db, 'evento', evento.id);
    
    await updateDoc(eventoRef, { asistentes: arrayRemove(this.globalData.globalCorr.trim()) });
    this.listaInscritos = this.listaInscritos.filter(e => e.id !== evento.id);

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
