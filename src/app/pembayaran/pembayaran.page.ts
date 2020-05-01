import { Storage } from '@ionic/storage';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { RestApiService } from './../rest-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { KeranjangService } from './../keranjang.service';
import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang.model';

@Component({
  selector: 'app-pembayaran',
  templateUrl: './pembayaran.page.html',
  styleUrls: ['./pembayaran.page.scss'],
})
export class PembayaranPage implements OnInit {
  totalHarga : number = 0;
  keranjang : Keranjang[] ;
  alamat : any ='jl.komplek garuda no 457';
  item : any = 'Tunai';
  options = [
    'Tempo',
    'Tunai',
    'Transfer'
  ]
  constructor(public keranjangSvc : KeranjangService,public loadingCtrl : LoadingController,
    public restApi : RestApiService,public toastCtrl : ToastController,public router : Router,public userSvc : UserService
    ,public storage : Storage) { }

  ngOnInit() {
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    this.keranjang = this.keranjangSvc.getAllKeranjang();
    if(this.keranjang.length > 0){
      for(let tmp of this.keranjang){
        this.totalHarga = this.totalHarga + tmp.getHarga() * tmp.getJumlahBarang();
    }
      loading.dismiss();
    }
  }
  finish(){
    let data = {};
    this.storage.get('id').then((val)=>{
      data['IDUser'] = val
    });
    this.storage.get('status').then((val)=>{
      data['StatusUser'] = val;
    })
    data['JenisPembayaran'] = this.item;
    data['TotalHarga'] = this.totalHarga;
    this.presentInsertTransaksi(data);
    console.log(data);
  }
  async presentInsertTransaksi(data : any){
    var i ;
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    this.restApi.postTransaksi(data)
      .subscribe(res => {
        console.log(res);
        if (res['Message'] == 'success') {
          const id = res['ID'];
          for(i = 0 ; i < this.keranjang.length ; i++){
              this.keranjangSvc.setKeranjangID(i,id);
          }
          this.restApi.postDetailTransaksi(this.keranjang)
          .subscribe(resp => {
            console.log(resp);
            if(resp['Message'] =='success'){
              this.router.navigate(['/page-confirmation']);
            }else{
              this.presentToastFinish(0);
            }
          })
        } else {
          this.presentToastFinish(0);
        }
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  async presentToastFinish(num : number){
    if(num == 1){
      const toast = await this.toastCtrl.create({
        message: 'Sukses menambah transaksi!',
        duration: 2000
      });
      toast.present();
    }
    else{
      const toast = await this.toastCtrl.create({
        message: 'Gagal menambah transaksi!',
        duration: 2000
      });
      toast.present();
    }
  }
  optionsPembayaran(item : any){
    this.item = item;
    console.log(this.item);
  }
  ubahAlamat(alamat : any){
    this.alamat = alamat;
    console.log(alamat);
  }
}
