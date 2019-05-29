import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBoatPage } from './add-boat';
import { BoatService } from '../../services/boat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPage } from '../list/list';

@NgModule({
  declarations: [
    AddBoatPage,
    ListPage
  ],
  imports: [
    IonicPageModule.forChild(AddBoatPage),
    FormsModule,
    ReactiveFormsModule,
  ],providers: [
    BoatService
  ]
})
export class AddBoatPageModule {}
