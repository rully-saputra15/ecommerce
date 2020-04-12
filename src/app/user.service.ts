import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  alamat : string ;
  status : number ;
  nama : string;
  id : number;
  constructor() { }

  setDataUser(id: number,nama : string , alamat : string,status : number){
    this.id = id;
    this.nama = nama ;
    this.alamat = alamat;
    this.status = status;
  }
  getDataID(){
    return this.id;
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
