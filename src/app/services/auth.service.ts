import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY: string = 'AIzaSyDyGOv4Sg5cjqJh7U-JWlWQBW-CEDOtdRA';
  userToken: string;

  constructor(
    private http: HttpClient
  ) {
    this.getToken();
  }
  // crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.API_KEY}`, authData)
      .pipe(map(res => {
        this.saveToken(res['idToken']);
        console.log('token guardado');
        return res;
      }));
  }

  logout() {

  }

  nuevoUsuario(usuario: UsuarioModel) {

    // con los puntos le decimos que queremos mandar toadas las
    // propiedades de UsuarioModel
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}:signUp?key=${this.API_KEY}`, authData)
      .pipe(map(res => {
        this.saveToken(res['idToken']);
        return res;
      }));
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  isAutenticated(): boolean {
    return this.userToken.length > 2;
  }

}
