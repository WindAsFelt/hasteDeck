import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GlobalData } from '../services/global-data';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;
constructor( private globalData: GlobalData) {
this.supabase = createClient('https://snhhqumksfwupjvncaus.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaGhxdW1rc2Z3dXBqdm5jYXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MjUxMjgsImV4cCI6MjA5ODAwMTEyOH0.cdpCNpc32QT7g_PpwF9hRua3lwgHwM5Oez5KVDKOJGA')
}
async registrar(email: string, password: string) {
return await this.supabase.auth.signUp({
    email: email,
    password: password,
});
}
async login(email: string, password: string) {
return await this.supabase.auth.signInWithPassword({
    email: email,
    password: password,
});
}
async logout() {
    this.globalData.globalId ='';
    this.globalData.globalCorr = '';
    this.globalData.globalName = ''; 
    return await this.supabase.auth.signOut();
    
}
}
