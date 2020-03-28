import { KeranjangService } from './../keranjang.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang.model';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
})
export class KeranjangPage implements OnInit {
  keranjang : Keranjang[] = [];
  constructor(public keranjangSvc : KeranjangService,public loadingCtrl : LoadingController) { }

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
      loading.dismiss();
    }
  }
}
