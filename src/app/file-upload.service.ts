import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseUrl = environment.apiUrl + '/citation-services/v1';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  obj: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    console.log(file);
    let formData: FormData = new FormData();
    formData.append('FileToUpload', file, file.name);
       

    return this.httpClient.post<any>(this.baseUrl + '/uploadFile', formData);
  }

  downloadFile(): Observable<any> {       

    return this.httpClient.post<any>(this.baseUrl + '/downloadFile', '');
  }


}
