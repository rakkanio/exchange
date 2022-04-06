import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
environment

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(reqObj: any):Observable<HttpEvent<any>>{
    const req = new HttpRequest('POST', `${environment.baseUrl}/upload`, reqObj, {
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
