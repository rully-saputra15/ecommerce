import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  nilai : any;
  barang : any;
  constructor(public restApi : RestApiService,public loadingCtrl : LoadingController, public router : Router) {}

  ngOnInit(){
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    await this.restApi.getAllBarang()
    .subscribe(res => {
      this.barang = res;
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
}
