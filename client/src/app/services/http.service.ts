import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error?.error?.message ||  error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public get(reqObj:any){
    if(reqObj.params){
      reqObj.params.network = this.cacheService.get('network');
    }else{
      reqObj.params = {
        network: this.cacheService.get('network')
      }
    }
    const options = { params: reqObj.params }
    return this.http.get(`${environment.baseUrl}/${reqObj.url}`, options).pipe(catchError(this.handleError));
  }

  public post(reqObj:any){
    return this.http.post(`${environment.baseUrl}/${reqObj.url}`, reqObj).pipe(catchError(this.handleError));
  }
}
