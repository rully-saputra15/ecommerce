import { Storage } from '@ionic/storage';
import { UserService } from './../user.service';
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
    ,public toastCtrl : ToastController,public userSvc : UserService,public storage: Storage) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    /*this.barang = this.restApi.getBarang(this.id);
    console.log(this.barang);
    loading.dismiss();*/
    let data = {};
    data['id'] = this.route.snapshot.paramMap.get('id');
    this.storage.get('status').then((val)=>{
      data['status'] = val;
      this.restApi.getBarang(data)
      .subscribe(res => {
        this.barang = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    });
  }
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Sukses ditambah ke keranjang!',
      duration: 500
    });
    toast.present();
  }
  async addToCart(){
    this.keranjangSvc.setKeranjang(this.id,this.barang[0]['nama_barang'],this.barang[0]['harga_pokok'],this.nilai);
    this.presentToast();
  }
  addNilai(){
    if(this.nilai === +this.barang[0]['stok_barang']){
      this.nilai = +this.barang[0]['stok_barang'];
    }else{
      this.nilai = this.nilai + 1;
    }
    
  }
  minusNilai(){
    if(this.nilai < 2){
      this.nilai = 1;
    }else{
      this.nilai = this.nilai - 1;
    }

  }
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
}
