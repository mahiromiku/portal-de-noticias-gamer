import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  #http = inject(HttpClient)
  urlPicture = environment.apiPictureUrl

  uploadFile(file: File): Observable<File> {
    const formData = new FormData();
    formData.append('file', file);
    return this.#http.post<File>(`${this.urlPicture}/upload`, formData);
  }
}
