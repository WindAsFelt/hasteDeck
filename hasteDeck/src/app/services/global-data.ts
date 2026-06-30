import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class GlobalData {
  globalId = ''; 
  globalName: string = '';
  globalCorr: string = '';


  constructor() { }

  async guardarDatos(id: string, usuario: string, correo: string) {
    this.globalId = id;
    this.globalName = usuario;
    this.globalCorr = correo;
    await Preferences.set({key: 'datosUsuario', value: JSON.stringify({ id, usuario, correo }) });
  }

  async cargarDatos() {
    const { value } = await Preferences.get({ key: 'datosUsuario' });
    if (value) {
      const datos = JSON.parse(value);
      this.globalId = datos.id;
      this.globalName = datos.usuario;
      this.globalCorr = datos.correo;
    }
  }
  
  async logoutDatos(){
    this.globalId = '';
    this.globalName = '';
    this.globalCorr = '';
    await Preferences.remove({ key: 'datosUsuario' });
  }
  ponerId(): string | null {
    return localStorage.getItem(this.globalId);
  }
  borrarId() {
    localStorage.removeItem(this.globalId);  // SÓLO para borrar perfil.
  }
}
