import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';
import { AddTaskPage } from '../add-task/add-task';
@NgModule({
  declarations: [
    TaskPage,
    AddTaskPage
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
  ],entryComponents:[
    AddTaskPage
  ]
})
export class TaskPageModule {}
