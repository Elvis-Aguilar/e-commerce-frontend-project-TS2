import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Servicio } from '../../models/servicios/servicio';
import { Observable, of } from 'rxjs';
import { Oferta } from '../../models/servicios/oferta';
import { TruequeProductoServicio } from '../../models/evento/trueque-producto-servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly _http = inject(HttpClient)
  private readonly API_URL = 'http://localhost/api-ecommerce/public/api/servicios/';

  constructor() { }


  public saveServicio(servi: Servicio): Observable<string> {
    return this._http.post<string>(this.API_URL + 'servicio-save', servi);
  }

  public saveImgServicio(formData: FormData): Observable<Servicio> {
    return this._http.post<Servicio>(this.API_URL + 'servicio-save-image', formData);
  }

  public getImage(filename: string): Observable<Blob> {
    return this._http.get(`${this.API_URL}servicios-img/${filename}`, { responseType: 'blob' });
  }

  public getServicosUsuario(idUser: number): Observable<Servicio[]> {
    return this._http.get<Servicio[]>(`${this.API_URL}servicios-user/${idUser}`);
  }

  public getServiciosTodos(): Observable<Servicio[]> {
    return this._http.get<Servicio[]>(`${this.API_URL}get-servicios`);
  }

  public getServicioId(id: number): Observable<Servicio> {
    return this._http.get<Servicio>(`${this.API_URL}get-servicio/${id}`);
  }

  public saveOferta(ofer: Oferta): Observable<string> {
    return this._http.post<string>(this.API_URL + 'save-oferta', ofer);
  }

  public getOfertasUsuario(id: number): Observable<Oferta[]> {
    return this._http.get<Oferta[]>(`${this.API_URL}get-servicios-user/${id}`);
  }

  public updateOferta(oferta:Oferta): Observable<Oferta[]> {
    return this._http.put<Oferta[]>(`${this.API_URL}update-oferta`, oferta)
  }

  public saveSoliciatudTrueque(trueque:TruequeProductoServicio): Observable<string>{
    return this._http.post<string>(`${this.API_URL}save-trueque-producto`,trueque)
  }

  public getSoliciatudTruequeResolver(id:number): Observable<TruequeProductoServicio[]> {
    return this._http.get<TruequeProductoServicio[]>(`${this.API_URL}get-trueques-producto-res/${id}`);
  }

  public updateSolicitudTrueque(trueque:TruequeProductoServicio): Observable<TruequeProductoServicio[]> {
    return this._http.put<TruequeProductoServicio[]>(`${this.API_URL}update-trueque-producto`, trueque)
  }


}
