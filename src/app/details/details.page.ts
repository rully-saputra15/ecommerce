import { ActivatedRoute, Router } from '@angular/router';
import { Barang } from '../barang.model';
import { KeranjangService } from './../keranjang.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Keranjang } from './../keranjang.model';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  barang : any;
  barangLoaded : any;
  nilai : number = 1;
  id : number ;
  constructor(public keranjangSvc : KeranjangService,public loadingCtrl : LoadingController,public restApi : RestApiService, public route : ActivatedRoute,public router : Router
    ,public toastCtrl : ToastController) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    this.barang = this.restApi.getBarang(this.id);
    console.log(this.barang);
    loading.dismiss();
    /*await this.restApi.getBarang(this.route.snapshot.paramMap.get('id'))
    .subscribe(res => {
      this.barang = res;
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });*/
  }
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Sukses ditambah ke keranjang!',
      duration: 2000
    });
    toast.present();
  }
  async loadingKeranjang(){
    const loading = await this.loadingCtrl.create({
      message : 'Menambah barang ke keranjang!',
      duration : 1000
    });
    loading.present();
    this.keranjangSvc.setKeranjang(this.id,this.barang[0]['nama_barang'],this.barang[0]['harga_pokok'],this.nilai);
    this.presentToast();
  }
  addNilai(){
    this.nilai = this.nilai + 1;
  }
  minusNilai(){
    this.nilai = this.nilai - 1;
  }
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
}
