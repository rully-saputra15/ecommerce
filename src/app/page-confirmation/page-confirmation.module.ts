import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageConfirmationPageRoutingModule } from './page-confirmation-routing.module';

import { PageConfirmationPage } from './page-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageConfirmationPageRoutingModule
  ],
  declarations: [PageConfirmationPage]
})
export class PageConfirmationPageModule {}
