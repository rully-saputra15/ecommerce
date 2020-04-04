import { Router } from '@angular/router';
import { RestApiService } from './../rest-api.service';
import { KeranjangService } from './../keranjang.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang.model';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
})
export class KeranjangPage implements OnInit {
  // tslint:disable-next-line: align
  keranjang : Keranjang[] = [];
  totalHarga : number = 0;
  constructor(public keranjangSvc : KeranjangService,public loadingCtrl : LoadingController,public restApi : RestApiService
    ,public toastCtrl : ToastController,public router : Router,public alertCtrl : AlertController) { }

  ngOnInit() {
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading Keranjang!'
    });
    await loading.present();
    this.keranjang = this.keranjangSvc.getAllKeranjang();
    if(this.keranjang.length > 0){
      for(let tmp of this.keranjang){
        this.totalHarga = this.totalHarga + tmp.getHarga() * tmp.getJumlahBarang();
    }
      loading.dismiss();
    } else{
      loading.dismiss();
    }
  }
  addJumlah(index : number){
    this.totalHarga = this.totalHarga - this.keranjang[index].getHarga() * this.keranjang[index].getJumlahBarang();
    //this.keranjang[index].addJumlahBarang();
    this.keranjangSvc.updateKeranjang(index, 1);
    this.totalHarga = this.totalHarga + this.keranjang[index].getHarga() * this.keranjang[index].getJumlahBarang();
  }
  minusJumlah(index : number){
    this.totalHarga = this.totalHarga - this.keranjang[index].getHarga() * this.keranjang[index].getJumlahBarang();
    //this.keranjang[index].minusJumlahBarang();
    this.keranjangSvc.updateKeranjang(index, 2);
    this.totalHarga = this.totalHarga + this.keranjang[index].getHarga() * this.keranjang[index].getJumlahBarang();
  }
  pembayaran(){
    this.router.navigate(['/pembayaran']);
  }
  hapusKeranjang(index){
    this.presentAlert(index);
  }
  async presentAlert(index){
    const alert = await this.alertCtrl.create({
      header: 'Hapus!',
      message: 'Apakah anda yakin ingin menghapus barang ini dari keranjang!',
      buttons:[
        {
          text: 'No',
          role: 'cancel',
        }, {
          text : 'Yes',
          handler:()=>{
            this.keranjang = this.keranjangSvc.hapusKeranjangID(index);
          }
        }
      ]
    });
    await alert.present();
  }
}
