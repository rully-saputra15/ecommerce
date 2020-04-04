import { KeranjangService } from './../keranjang.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-confirmation',
  templateUrl: './page-confirmation.page.html',
  styleUrls: ['./page-confirmation.page.scss'],
})
export class PageConfirmationPage implements OnInit {

  constructor(public router : Router,public keranjangSvc : KeranjangService) { }

  ngOnInit() {
  }
  home(){
    this.keranjangSvc.clearKeranjang();
    this.router.navigate(['/home']);
  }
}
