import { Router } from '@angular/router';
import { RestApiService } from './../rest-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  /*validation_messages = {
    'username':[
      {type:'required',message: 'Username belum diisi!'},
      {type:'minlength',message: 'Username minimal 5 karakter'},
      {type:'maxlength',message: 'Username maksimal 25 karakter'},
      {type:'pattern',message: 'Username hanya kombinasi karakter dan angka'},
    ]
  }*/
  constructor(public loadingCtrl : LoadingController,public restApi : RestApiService,public router: Router,public toastCtrl : ToastController) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    /*if(!form.valid){
      return;
    }*/
    const nama = form.value.nama;
    const email = form.value.email;
    const password = form.value.password;
    //const username = form.value.username;
    const handphone = form.value.handphone;
    const alamat = form.value.alamat;
    const provinsi = form.value.provinsi;
    const kota = form.value.kota;
    let data = {};
    data['email'] = email;
    data['nama'] = nama;
    data['password'] = password;
    data['handphone'] = handphone;
    data['alamat'] = alamat;
    data['provinsi'] = provinsi;
    data['kota'] = kota;
    this.presentLoading(data);
  }
  async presentLoading(data){
    const loading = await this.loadingCtrl.create({
      message: 'Proses mendaftar akun!'
    });
    loading.present();
    await this.restApi.postRegisterUser(data)
    .subscribe(res => {
      console.log(res);
      if(res['message'] == 'success!'){
        this.presentToast(1);
        loading.dismiss();
        this.router.navigate(['./login']);
      }else{
        this.presentToast(0);
        loading.dismiss();
      }
    },err =>{
      console.log(err);
      this.presentToast(0);
      loading.dismiss();
    });
  }
  async presentToast(nil){
    if(nil === 0){
      const toast = this.toastCtrl.create({
        message:'Akun anda gagal terdaftar!',
        duration:1000
      });
      (await toast).present();
    }else{
      const toast = this.toastCtrl.create({
        message:'Akun anda sudah terdaftar!',
        duration:1000
      });
      (await toast).present();
    }

  }
}
