import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  alamat : string ;
  status : number ;
  nama : string;
  constructor() { }

  setDataUser(nama : string , alamat : string,status : number){
    this.nama = nama ;
    this.alamat = alamat;
    this.status = status;
  }
  getDataAlamat(){
    return this.alamat;
  }
  getDataStatus(){
    return this.status;
  }
  getDataNama(){
    return this.nama;
  }
}
