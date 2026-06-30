import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonToast, IonInput } from '@ionic/angular/standalone';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { RouterLink } from '@angular/router';
import { GlobalData } from '../services/global-data';
import { db } from '../../main';
import { SupabaseService } from '../services/supabase.services'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [RouterLink, IonInput, IonToast, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class LoginPage implements OnInit {
  alertButtons = ['Action'];
  getCorr: string = ""; 
  getPassword: string = ""; 
  id: string="";
  getFlag: boolean = false;
  constructor(
  private globalData: GlobalData,
  private supabaseService: SupabaseService)
  {}
  
  ngOnInit() {
  }

  async logout() {
    this.globalData.logoutDatos()
    this.supabaseService.logout();
    console.log("Se supone que se cerró todo...", this.globalData.globalId, "<---")
  }

  async login() {
    if (this.getCorr || this.getPassword){

    const usuariosRef = collection(db, 'usuario');
    const q = query(usuariosRef, where('correo', '==', this.getCorr.trim()));
    const querySnapshot = await getDocs(q);

    const docUsuario = querySnapshot.docs[0];
    const datosUsuario = docUsuario.data();
    const idFire = datosUsuario['id'];
    const nombreUs = datosUsuario['nmbUs'];
    this.supabaseService.login(this.getCorr , this.getPassword)
    this.globalData.guardarDatos(idFire, nombreUs , this.getCorr)
    console.log("Se logró guardar el id:", this.globalData.globalId, "|| y el correo: ", this.globalData.globalCorr, "|| y usuario:", this.globalData.globalName)
    } else {
      console.log ("Hubo un error :s")
    }
  }
}