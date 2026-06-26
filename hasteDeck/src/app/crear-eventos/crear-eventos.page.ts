import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonToast, IonButton, IonCheckbox, IonAccordion, IonItem, IonLabel, IonAccordionGroup, IonList, IonModal, IonDatetimeButton, IonDatetime } from '@ionic/angular/standalone';
import { collection, addDoc,query, where, getDocs, Timestamp } from 'firebase/firestore';
import { GlobalData } from '../services/global-data';
import { RouterLink } from '@angular/router';
import { db } from '../../main';



@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.page.html',
  styleUrls: ['./crear-eventos.page.scss'],
  standalone: true,
  imports: [RouterLink, IonLabel, IonDatetime, IonDatetimeButton, IonModal, IonSelect, IonSelectOption, IonList, IonItem, IonAccordion, IonCheckbox, IonButton, IonToast, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CrearEventosPage implements OnInit {
  nombreX: string = "RX-78-2";
  alertButtons = ['Action'];
  integrantes: number = 0; 
  nombre_evento: string = ""; 
  fecha: string = "";
  hora: string = "";
  categoria: string = "";
  descripcion: string = "";
  ubi: string = "";

  constructor(private globalData: GlobalData) { }

  ngOnInit() {
  }
  

  async crearEventoBD() {
    if (!this.nombre_evento || !this.fecha || !this.hora) {
      console.error("Faltan datos obligatorios para crear el evento.");
      return;
    } try {
      const partesFecha = this.fecha.split('/'); 
      const dia = parseInt(partesFecha[0]);
      const mes = parseInt(partesFecha[1]) + 1; 
      const anio = parseInt(partesFecha[2]);
      const partesHora = this.hora.split(':');
      const horas = parseInt(partesHora[0]);
      const minutos = parseInt(partesHora[1]);
      const fechaCompletaJS = new Date(anio, mes, dia, horas, minutos);
      const timestampFirestore = Timestamp.fromDate(fechaCompletaJS);

      const idLocal = this.globalData.ponerId();

      const docRef = await addDoc(collection(db, "evento"), {
        id: idLocal,
        nmbEvent: this.nombre_evento,
        cant: Number(this.integrantes),
        categoria: this.categoria,
        fecha: timestampFirestore,
        dspcion: this.descripcion,
        ubicacion: this.ubi,
        asistentes: []
      }
    );

      console.log("Evento creado.");

    } catch (error) {
      console.error("Hubo un error al guardar el evento: ", error);
    }
  }
}