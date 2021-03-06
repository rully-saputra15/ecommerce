import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { RestApiService } from './../rest-api.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string ;
  password : string;
  constructor(public loadingCtrl: LoadingController,public restApi : RestApiService,
    public user : UserService,public router : Router,public toastCtrl : ToastController,
    public storage: Storage,public alertCtrl: AlertController) { }

  ngOnInit() {
    this.storage.get('id').then((val)=>{
      if(val !== null){
        this.router.navigate(['./home'])
      }
    });
  }

  async login(){
    const loading = await this.loadingCtrl.create({
      message : 'Login!'
    });
    await loading.present();
    let data = {};
      data['email'] = this.email;
      data['password'] = this.password;
    await this.restApi.login(data)
    .subscribe(res => {
      if(res[0]['message'] === 'success'){
        //this.user.setDataUser(res[0]['id'],res[0]['nama'],res[0]['alamat'],res[0]['status']);
        this.storage.set('nama', res[0]['nama']);
        this.storage.set('status', res[0]['status']);
        this.storage.set('id',res[0]['id']);
        loading.dismiss();
        this.router.navigate(['./home']);
      }
    },err => {
      loading.dismiss();
      //this.showAlert(err);
      this.presentToast();
    });
  }
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Email dan password yang dimasukkan salah!',
      duration: 500
    });
    toast.present();
  }
  async showAlert(error){
    const alert = await this.alertCtrl.create({
      header:'Error',
      message:error,
      buttons:['Oke']
    });
    alert.present();
  }
  register(){
    this.router.navigate(['./register']);
  }
}
