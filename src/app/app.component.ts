import { environment } from './../environments/environment';
import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    //private oneSignal : OneSignal,
    private alertCtrl : AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('cordova')){
        //this.setupPush();
      }
    });
  }
    /*setupPush(){
      this.oneSignal.startInit('4d37db28-33d0-4500-a788-24290f136619',environment.firebase.appId);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

      this.oneSignal.handleNotificationReceived().subscribe(data => {
        let msg = data.payload.body;
        let title = data.payload.title;
        let additionalData = data.payload.additionalData;
        this.showAlert(title,msg,additionalData.task);
      });
      this.oneSignal.handleNotificationOpened().subscribe(data => {
        let additionalData = data.notification.payload.additionalData;
        this.showAlert('Notification opened','You already read this before',additionalData.task);
      });
      this.oneSignal.endInit();
    }
    async showAlert(title,msg,task){
      const alert = await this.alertCtrl.create({
        header : title,
        subHeader : msg,
        buttons: [
        {
          text:'Action:  ${task}',
          handler :()=>{
          // navigasi ke screen tertentu
          }
        }
        ]
      })
      alert.present();
    }
    /*this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if(data.wasTapped){
        console.log('Received in background');
        this.router.navigate([data.landing_page,data.price]);
      }else{
        console.log('Received in foreground');
        this.router.navigate([data.landing_page,data.price]);
      }
    });*/

}
