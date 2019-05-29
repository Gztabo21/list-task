import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderListPage } from './provider-list';

@NgModule({
  declarations: [
    ProviderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderListPage),
  ],
})
export class ProviderListPageModule {}
