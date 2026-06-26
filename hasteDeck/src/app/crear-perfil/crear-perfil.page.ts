import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonToast, IonCheckbox } from '@ionic/angular/standalone';
import { collection, addDoc } from 'firebase/firestore';
import { RouterLink } from '@angular/router';
import { GlobalData } from '../services/global-data';
import { db } from '../../main';
import { SupabaseService } from '../services/supabase.services'; 

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.page.html',
  styleUrls: ['./crear-perfil.page.scss'],
  standalone: true,
  imports: [RouterLink, IonCheckbox, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonToast]
})
export class CrearPerfilPage implements OnInit {
  nombreX: string = "RX-78-2";
  alertButtons = ['Action'];
  getName: string = ""; 
  getCorr: string = ""; 
  getPassword: string = ""; 
  id: string="";
  getFlag: boolean = false;
  rol: boolean = false;
  constructor(
  private globalData: GlobalData,
  private supabaseService: SupabaseService)
  {}
  
  ngOnInit() {
  }



  async registrarUsuario() {
    if (!this.getCorr || !this.getPassword) {
      console.log("Falta correo o contraseña");
      return;
    }

    try {
      const { data, error } = await this.supabaseService.registrar(this.getCorr, this.getPassword);
      
      if (error) {
        console.error("Error al registrar en Supabase: ", error.message);
        return;
      }

      await this.guardarBD();
      console.log("Autenticación creada en Supabase exitosamente");

    } catch (error) {
      console.error("Error inesperado: ", error);
    }
  }

  async guardarBD() {
    try {
      let randID = "";
      if (this.getFlag === true) {
      const bloque1 = Math.floor(1000 + Math.random() * 9000);
      const bloque2 = Math.floor(1000 + Math.random() * 9000);
      randID = `${bloque1}-${bloque2}`;
      this.globalData.guardarId(randID);
        console.log("Es cliente, no se genera ID de tienda.");
      } else {
        console.log("Es cliente, no se genera ID de tienda.");
      }
      this.rol = this.getFlag;

      const docRef = await addDoc(collection(db, "usuario"), {
        correo: this.getCorr,
        nmbUs: this.getName,
        id: randID,
        rol: this.rol
      });
      
      this.globalData.guardarId(randID);
      console.log("ID generado correctamente en Firebase: ", randID);
    } catch (error) {
      console.error("Hubo un error al guardar en Firebase: ", error);
    }
  }
}