import { Keranjang } from './keranjang.model';
import { Injectable } from '@angular/core';
import { Transaksi } from './transaksi.model';

@Injectable({
  providedIn: 'root'
})
export class KeranjangService {
  private keranjang : Keranjang[] = [];
  private transaksi : Transaksi[] = [];
  constructor() { }
  setKeranjang(IDBarang : number, NamaBarang : string, Harga : number , JumlahBarang : number){
    const tmp = new Keranjang(IDBarang,NamaBarang,Harga,JumlahBarang);
    this.keranjang.push(tmp);
  }
  getAllKeranjang(){
    return [...this.keranjang];
  }
}
