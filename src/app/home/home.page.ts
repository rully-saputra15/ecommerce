import { KeranjangService } from './../keranjang.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { LoadingController, IonInfiniteScroll, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { empty } from 'rxjs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  nilai : any;
  jumlah_keranjang : number;
  barangLoaded : any = [];
  barang : any = [];
  item : any = '';
  status : number ;
  i : number = 25;
  visited : number ;
  merk = [
    '- A -',
    'CRUN',
    'CKD',
    'KOMACHI',
    'CKD',
    'YASUHO'
  ];
  data = {};
  constructor(public restApi : RestApiService,public loadingCtrl : LoadingController, public router : Router,
    public userSvc : UserService,public keranjangSvc : KeranjangService,public storage : Storage,public alertCtrl : AlertController,
    public toastCtrl : ToastController) {}

  ngOnInit(){
    this.jumlah_keranjang = this.keranjangSvc.countKeranjang();
    this.storage.get('id').then((val)=>{
      let tmp = {};
      tmp['IDUser'] = val;
      this.restApi.getStatusUser(tmp)
      .subscribe(res =>{
          this.storage.set('status',res[0]['status']);
          this.storage.get('status').then((val) => {
            this.data['status'] = val;
            if(this.barangLoaded.length <= 0){
              this.presentLoading();
            }
          });
      },err =>{

      });
    });
  }
  ionViewWillEnter(){
    this.jumlah_keranjang = this.keranjangSvc.countKeranjang();
    if(this.visited == 1){
      if(this.barangLoaded.length <= 0){
        this.presentLoading();
        this.visited = 0;
      }
    }
  }
  async logout(){
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message : 'Anda yakin untuk keluar dari akun?',
      buttons:[
        {
          text:'Tidak',
          role:'cancel'
        },
        {
        text:'Ya',
        handler:()=>{
          this.storage.clear()
          .then(
            data => this.router.navigate(['./login']),
            error => this.errorLogout()
          );
        }
        }
      ]
    });
    alert.present();
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    if(this.data['status'] == null){
      loading.dismiss();
      this.visited = 1;
      this.router.navigate(['./login']);
    }else{
      await this.restApi.getAllBarang(this.data)
      .subscribe(res => {
        this.barangLoaded = res;
        this.barang = this.barangLoaded.slice(0,this.i);
        this.restApi.setAllBarang(this.barangLoaded);
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }

  }
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
  listView(){
    this.router.navigate(['./list-view']);
  }
  setFilteredBarang(ev : CustomEvent){
    this.barang = this.barangLoaded;
    const val = ev.detail.value;
    this.barang = this.barangLoaded.filter(barang => {
        // tslint:disable-next-line: no-unused-expression
        return barang.nama_barang.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
  setMerk(ev : CustomEvent){
    this.barang = this.barangLoaded;
    const val = ev.detail.value;
    this.barang = this.barangLoaded.filter(barang => {
      return barang.merk.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }
  loadData(event){
    setTimeout(()=>{
      this.barang = this.barangLoaded.slice(0,this.i+25);
      this.i = this.i + 25;

      event.target.complete();

      if (this.barang.length === 1800) {
        event.target.disabled = true;
      }
    },500);
  }
  myOrder(){
    this.router.navigate(['./my-order']);
  }
  async errorLogout(){
    const toast = await this.toastCtrl.create({
      message:'Gagal logout!',
      duration:1000
    });
    toast.present();
  }
}
