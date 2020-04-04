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
  i : number = 500;
  constructor(public restApi : RestApiService,public keranjangSvc : KeranjangService,public router : Router) { }

  ngOnInit() {
    this.barangLoaded = this.restApi.getAllBarangLocal();
    this.barang = this.barangLoaded.slice(0,this.i);
  }
  loadData(event){
    setTimeout(()=>{
      this.barang = this.barangLoaded.splice(0,this.i+500);
      this.i = this.i + 500;

      event.target.complete();

      if(this.barang.length === 1800){
        event.target.disabled = true;
      }
    },500);
  }
  tambahKeranjang(index){
    this.keranjangSvc.setKeranjang(this.barang[index]['id'],this.barang[index]['nama_barang'],this.barang[index]['harga_pokok'],1);
  }
  keranjang(){
    this.router.navigate(['./keranjang']);
  }
}
