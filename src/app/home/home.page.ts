import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  nilai : any;
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
  constructor(public restApi : RestApiService,public loadingCtrl : LoadingController, public router : Router,public userSvc : UserService) {}

  ngOnInit(){
    this.status = this.userSvc.getDataStatus();
    if(this.barangLoaded.length <= 0){
      this.presentLoading();
    }
  }
  ionViewWillEnter(){
    this.status = this.userSvc.getDataStatus();
    if(this. visited == 1){
      if(this.barangLoaded.length <= 0){
        this.presentLoading();
        this.visited = 0;
      }
    }
  }
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message : 'Loading!'
    });
    await loading.present();
    if(this.status == null){
      loading.dismiss();
      this.visited = 1;
      this.router.navigate(['./login']);
    }else{
      await this.restApi.getAllBarang(this.status)
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
}
