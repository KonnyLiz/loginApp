import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY: string = 'AIzaSyDyGOv4Sg5cjqJh7U-JWlWQBW-CEDOtdRA';

  constructor(
    private http: HttpClient
  ) { }
  // crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  login(usuario: UsuarioModel) { }

  logout() {

  }

  nuevoUsuario(usuario: UsuarioModel){

    // con los puntos le decimos que queremos mandar toadas las
    // propiedades de UsuarioModel
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}:signUp?key=${this.API_KEY}`, authData);
  }

}
