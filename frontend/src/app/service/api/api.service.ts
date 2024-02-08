import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Cards } from '../../../interface/Cards.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  #http = inject(HttpClient)
  url = environment.apiUrl

  public getCardById(id: number): Observable<Cards>{
    return this.#http.get<Cards>(`${this.url}/${id}`)
  }

  public getCards(): Observable<Cards[]>{
    return this.#http.get<Cards[]>(this.url)
  }

  public postCard(card: Cards): Observable<Cards>{
    return this.#http.post<Cards>(this.url, card)
  }

  public patchCard(id: number, card: Cards): Observable<Cards> {
    return this.#http.patch<Cards>(`${this.url}/${id}`, card);
  }
}