import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { RestApiService } from './../rest-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string ;
  password : string;
  constructor(public loadingCtrl: LoadingController,public restApi : RestApiService,public user : UserService,public router : Router,public toastCtrl : ToastController) { }

  ngOnInit() {
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
        this.user.setDataUser(res[0]['nama'],res[0]['alamat'],res[0]['status']);
        loading.dismiss();
        this.router.navigate(['./home']);
      }
    },err => {
      loading.dismiss();
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
  register(){
    this.router.navigate(['./register']);
  }
}
