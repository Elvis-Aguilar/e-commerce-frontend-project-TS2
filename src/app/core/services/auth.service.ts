import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { CuentaMonetaria } from '../models/cuenta-monetaria';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioSesion!: Usuario;

  private readonly _http = inject(HttpClient)

  private readonly API_URL = 'http://localhost/api-ecommerce/public/api/';

  public registerUser(us: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this.API_URL + 'user-register', us);
  }

  public saveImgUsuario(formData: FormData): Observable<Usuario> {
    return this._http.post<Usuario>(this.API_URL + 'user-register-foto', formData);
  }

  public UserLogin(us: Usuario) {
    return this._http.post<Usuario>(this.API_URL + 'user-login', us);
  }

  public getUsers(): Observable<Usuario> {
    return this._http.get<Usuario>(this.API_URL + 'users');
  }

  public saveSesionNavigate(us: Usuario) {
    localStorage.clear();
    this.usuarioSesion = us;
    localStorage.setItem('sesion_actual', JSON.stringify(us))
  }

  public getImage(filename: string): Observable<Blob> {
    return this._http.get(this.API_URL + 'user-img/' + filename, { responseType: 'blob' });
  }

  public getUsuarioSesion(): Usuario | undefined {
    if (!this.usuarioSesion) {
      this.usuarioSesion = JSON.parse(localStorage.getItem('sesion_actual')!) || undefined;
    }
    if (this.usuarioSesion) {
      if (this.usuarioSesion.usuario_id === undefined) {
        this.usuarioSesion.usuario_id = this.usuarioSesion.id
      } else {
        this.usuarioSesion.id = this.usuarioSesion.usuario_id
      }
    }

    return this.usuarioSesion;
  }

  public closeSesion() {
    localStorage.clear();
    this.usuarioSesion = JSON.parse(localStorage.getItem('sesion_actual')!) || undefined;
  }

  public getPublicador(id:number): Observable<Usuario> {
    return this._http.get<Usuario>(`${this.API_URL}user/${id}`);
  }

  public getCuentaMonetaria(id:number): Observable<CuentaMonetaria> {
    return this._http.get<CuentaMonetaria>(`${this.API_URL}cuenta-monetaria/${id}`);
  }

  public updateCuentaMonetaria(cuenta:CuentaMonetaria): Observable<CuentaMonetaria> {
    return this._http.put<CuentaMonetaria>(`${this.API_URL}update-cuenta-monetaria/${cuenta.cuenta_monteraia_id}`, cuenta);
  }

}
