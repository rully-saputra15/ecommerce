import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { KeranjangService } from './../keranjang.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.page.html',
  styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {
  barang : any = [];
  barangLoaded : any = [];
  i : number = 50;
  constructor(public restApi : RestApiService,public keranjangSvc : KeranjangService,public router : Router,public toastCtrl : ToastController
    ,public loadingCtrl : LoadingController) { }

  ngOnInit() {
    
    this.presentLoading();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading list!'
    });
    await loading.present();
    this.barangLoaded = this.restApi.getAllBarangLocal();
    this.barang = this.barangLoaded;
<<<<<<< HEAD
    await loading.dismiss();
=======
    loading.dismiss();
>>>>>>> 1c750a712dfae85249c252c4b67701cbe7611676
  }
  ionViewWillLeave(){
    this.barang = [];
    this.barangLoaded = [];
  }
  /*loadData(event){
    setTimeout(()=>{
      this.barang = this.barangLoaded.splice(0,this.i+50);
      this.i = this.i + 50;
      console.log(this.i);
      event.target.complete();

      if(this.barang.length >= 1849){
        event.target.disabled = true;
      }
    },500);
  }*/
  async tambahKeranjang(index){
    const toast = this.toastCtrl.create({
      message : 'Sukses menambah ke keranjang!',
      duration : 500
    });
    this.keranjangSvc.setKeranjang(this.barang[index]['id'],this.barang[index]['nama_barang'],this.barang[index]['harga_pokok'],1);
    (await toast).present();
  }
  
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
  search(ev : CustomEvent){
    const val = ev.detail.value;
    console.log(val);
    if(val === ''){
      this.i = 50;
      console.log(this.i);
      this.barang = this.barangLoaded.splice(0,this.i);
      console.log(this.barang);
    } else {
    this.barang = this.barangLoaded.filter(barang => {
        // tslint:disable-next-line: no-unused-expression
        return barang.nama_barang.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
  }
}
