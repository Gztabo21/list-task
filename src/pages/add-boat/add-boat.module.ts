import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBoatPage } from './add-boat';

@NgModule({
  declarations: [
    AddBoatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBoatPage),
  ],
})
export class AddBoatPageModule {}
