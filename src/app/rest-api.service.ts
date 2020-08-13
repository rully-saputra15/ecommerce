import { Barang } from './barang.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, retry } from 'rxjs/operators';

import { take } from 'rxjs/operators'
/*const apiUrl = "http://localhost/quimtafari/api/product/read_all_barang.php";
const apiUrlReadBarangID = "http://localhost/quimtafari/api/product/read_barang.php";
const apiUrlTransaksi = "http://localhost/quimtafari/api/product/addTransaksi.php";
const apiUrlDetailTransaksi = "http://localhost/quimtafari/api/product/addDetailTransaksi.php";
const apiUrlLogin = "http://localhost/quimtafari/api/product/login.php";
const apiUrlReadTransaksi = "http://localhost/quimtafari/api/product/readAllTransaksi.php";
const apiUrlRegister = "http://localhost/quimtafari/api/product/register.php";
const apiUrlStatusUser = "http://localhost/quimtafari/api/product/statusUser.php";*/

const apiUrl = 'https://adminecommerce.000webhostapp.com/api/product/read_all_barang.php';
const apiUrlReadBarangID = 'https://adminecommerce.000webhostapp.com/api/product/read_barang.php';
const apiUrlTransaksi = 'https://adminecommerce.000webhostapp.com/api/product/addTransaksi.php';
const apiUrlDetailTransaksi = 'https://adminecommerce.000webhostapp.com/api/product/addDetailTransaksi.php';
const apiUrlLogin = "https://adminecommerce.000webhostapp.com/api/product/login.php";
const apiUrlRegister = "https://adminecommerce.000webhostapp.com/api/product/register.php";
const apiUrlReadTransaksi = "https://adminecommerce.000webhostapp.com/api/product/readAllTransaksi.php";
const apiUrlStatusUser = "https://adminecommerce.000webhostapp.com/api/product/statusUser.php";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  barang : any = [];
  constructor(private http: HttpClient) { 
  }
  getAllBarang(data : any):Observable<any>{
    return this.http.post(apiUrl,JSON.stringify(data)).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getBarang(data : any):Observable<any>{
    return this.http.post(apiUrlReadBarangID,JSON.stringify(data)).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  /*getBarang(id : any){
    return{
      ...this.barang.find(barang => {
        return barang.id !== id
      })
    };
  }*/
  login(data : any):Observable<any>{
    return this.http.post(apiUrlLogin,JSON.stringify(data)).pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError));
  }
  getStatusUser(data : any):Observable<any>{
    return this.http.post(apiUrlStatusUser,JSON.stringify(data)).pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  setAllBarang(data : any){
    this.barang = data;
  }
  getAllBarangLocal(){
    return this.barang;
  }
  postTransaksi(data : any):Observable<any>{
    return this.http.post(apiUrlTransaksi,JSON.stringify(data))
    .pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  postRegisterUser(data : any):Observable<any>{
    return this.http.post(apiUrlRegister,JSON.stringify(data))
    .pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  postDetailTransaksi(data : any):Observable<any>{
    return this.http.post(apiUrlDetailTransaksi,JSON.stringify(data))
    .pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getAllTransaksi(data : any):Observable<any>{
    return this.http.post(apiUrlReadTransaksi,JSON.stringify(data))
    .pipe(
      retry(2),
      map(this.extractData),
      catchError(this.handleError)
    );
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
