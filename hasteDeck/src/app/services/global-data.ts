import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonToast, IonButton } from '@ionic/angular/standalone';
import { collection, addDoc,query, where, getDocs } from 'firebase/firestore';
import { db } from '../../main';


@Injectable({
  providedIn: 'root',
})
export class GlobalData {
  private globalId = 'Id_usuario'; 
  private globalName = 'nmbUsuario'

  constructor() { }

  guardarId(id: string) {
    localStorage.setItem(this.globalId, id)
  }
  ponerId(): string | null {
    return localStorage.getItem(this.globalId);
  }
  borrarId() {
    localStorage.removeItem(this.globalId);  // SÓLO para borrar perfil.
  }
}
