import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public get(reqObj:any){
    const options = { params: reqObj.params }
    return this.http.get(`${environment.baseUrl}/${reqObj.url}`, options).pipe(catchError(this.handleError));
  }

  public post(reqObj:any){
    return this.http.post(`${environment.baseUrl}/${reqObj.url}`, reqObj).pipe(catchError(this.handleError));
  }
}
