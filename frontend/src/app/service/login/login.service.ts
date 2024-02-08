import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Register } from '../../../interface/Register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLog = signal(false)
  #http = inject(HttpClient)
  url = environment.registerUrl

  user = signal<{name: string, img: string} | null>(null)

  makeLogin(){
    this.isLog.set(true)
  }

  makeLogout(){
    this.isLog.set(false)
  }

  setUser(name: string, img: string){
    this.user.set({name, img})
  }

  public postRegister(register: Register): Observable<Register>{
    return this.#http.post<Register>(this.url, register)
  }

  public getRegisterList(): Observable<Register[]>{
    return this.#http.get<Register[]>(this.url)
  }
}
