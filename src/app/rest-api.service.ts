import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { take } from 'rxjs/operators'

//const apiUrl = "http://localhost/quimtafari/api/product/read_all_barang.php";
//const apiUrlReadBarangID = "http://localhost/quimtafari/api/product/read_barang.php";
const apiUrl = "https://adminecommerce.000webhostapp.com/api/product/read_all_barang.php";
const apiUrlReadBarangID = "https://adminecommerce.000webhostapp.com/api/product/read_barang.php";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { 
  }
  getAllBarang():Observable<any>{
    return this.http.get(apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getBarang(id : any):Observable<any>{
    return this.http.get(apiUrlReadBarangID + '?id=' + id).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
