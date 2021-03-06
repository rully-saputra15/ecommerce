import { Storage } from '@ionic/storage';
import { UserService } from './../user.service';
import { RestApiService } from './../rest-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  transaksi : any = [];
  constructor(public loadingCtrl : LoadingController,public restApi : RestApiService,public userSvc : UserService,
    public toastCtrl : ToastController,public storage : Storage) { }

  ngOnInit() {
    let data = {};
    this.storage.get('id').then((val)=>{
      data['id'] = val;
      this.presentLoading(data);
    })
  }
  async presentLoading(data){
    const loading = await this.loadingCtrl.create({
      message:'loading!'
    });
    loading.present();
    await this.restApi.getAllTransaksi(data)
    .subscribe(res=>{
      if(res['message'] == 'Transaksi kosong'){
        this.presentToast();
        loading.dismiss();
      }
      this.transaksi = res;
      if(this.transaksi.length > 0){
        for(let i = 0 ; i < this.transaksi.length ; i++){
          if(this.transaksi[i]['status'] == 0){
            this.transaksi[i]['status'] = false;
          }else{
            this.transaksi[i]['status'] = true;
          }
        }
      }
      loading.dismiss();
    },err =>{
      loading.dismiss();
    })
  }
  async presentToast(){
    const toast = this.toastCtrl.create({
      message :'Belum ada transaksi!',
      duration : 1000
    });
    (await toast).present();
  }
}
