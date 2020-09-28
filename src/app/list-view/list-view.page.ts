import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { KeranjangService } from './../keranjang.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.page.html',
  styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {
  barang : any = [];
  barangLoaded : any = [];
  i : number = 50;
  constructor(public restApi: RestApiService,
              public keranjangSvc: KeranjangService,
              public router: Router,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public storage: Storage) { }

  ngOnInit() {
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading list!'
    });
    await loading.present();
    this.barangLoaded = this.restApi.getAllBarangLocal();
    if(this.barangLoaded === false){
      this.storage.get('status').then(val => {
        let data = {
          status : val
        };
        this.restApi.getAllBarang(data)
        .subscribe(res => {
          this.barangLoaded = res;
          this.initBarang();
        })
      });
    } else {
      this.initBarang();
    }
    loading.dismiss();
  }
  ionViewWillLeave(){
    this.barang = [];
    this.barangLoaded = [];
  }
  loadData(event){
    setTimeout(()=>{
      let tmp = this.i + 50;
      for(let i = this.i ; i < tmp ; i++){
        this.barang.push(this.barangLoaded[i]);
      }
      this.i = this.i + 50;
      event.target.complete();
      if(this.barang.length >= this.barangLoaded.length){
        event.target.disabled = true;
      }
    },500);
  }
  async tambahKeranjang(index){
    const toast = this.toastCtrl.create({
      message : 'Sukses menambah ke keranjang!',
      duration : 500
    });
    this.keranjangSvc.setKeranjang(this.barang[index]['id'],this.barang[index]['nama_barang'],this.barang[index]['harga_pokok'],1);
    (await toast).present();
  }

  keranjang() {
    this.router.navigate(['./keranjang']);
  }
  search(ev : CustomEvent){
    const val = ev.detail.value;
    if(val === ''){
      this.initBarang();
    } else {
    this.barang = this.barangLoaded.filter(barang => {
        // tslint:disable-next-line: no-unused-expression
        return barang.nama_barang.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
  }

  initBarang(){
    this.barang = [];
    for(let i = 0 ; i < this.i ; i++){
      this.barang.push(this.barangLoaded[i]);
    }
    this.i = 25;
  }
}
