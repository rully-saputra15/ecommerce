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
    let status = 0;
    for(let i = 0 ; i < this.keranjang.length ; i++){
      if(this.keranjang[i].IDBarang === IDBarang){
        this.updateKeranjang(i,1);
        status = 1;
      }
    }
    if(status == 0){
      const tmp = new Keranjang(IDBarang,NamaBarang,Harga,JumlahBarang);
      this.keranjang.push(tmp);
    }
  }
  countKeranjang(){
    return this.keranjang.length;
  }
  getAllKeranjang(){
    return [...this.keranjang];
  }
  updateKeranjang(index : number,status : number){
    if(status == 1){
      this.keranjang[index].addJumlahBarang();
    }else{
      this.keranjang[index].minusJumlahBarang();
    }
  }
  setKeranjangID(index : number,id : number){
      this.keranjang[index].setIDTransaksi(id);
  }
  clearKeranjang(){
    this.keranjang = [];
  }
  hapusKeranjangID(index : number){
    this.keranjang.splice(index,1);
    return this.keranjang;
  }
}
