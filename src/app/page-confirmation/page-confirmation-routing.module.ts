import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageConfirmationPage } from './page-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: PageConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageConfirmationPageRoutingModule {}
