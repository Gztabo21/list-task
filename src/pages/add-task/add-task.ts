import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormGroup,
  FormControl

} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Provider } from '../../interface/provider'
import { Task } from '../../interface/task';

// import { TaskPage }from '../task/task';
import { ListPage } from'../list/list';

import { ProviderService } from '../../services/provider.service';
import {TaskService} from '../../services/task.service';

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {
  langs;
  langForm;
  unit
  Status: boolean = false
  Providers : any []=[{}]
task: Task = {
  key:null,
  Name:null,
  observation:null,
  Status:null,
  DateCulminated:null,
  CreationDate:null,
  provider:null,
  boat:null
}
myParam: string;
id:string;
tasks : any;
editing :boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private providerService :ProviderService,
    private taskService: TaskService,
    public alertCtrl: AlertController) {
    this.langForm = new FormGroup({
      "langs": new FormControl({value: 'rust', disabled: false})
    });
    this.myParam = navParams.get('Boat');
    console.log(this.myParam)
    this.id = navParams.get('idTask');

    if(this.id){

      this.editing = true;
      this.taskService.getTaskList().subscribe((data:Task[])=>{
        this.tasks = data
        this.task = this.tasks.find( (r)=> { return r.key == this.id} );
        // console.log(this.task)
      },(error)=>{
        console.log(error);
      })
    }
    

    this.providerService.getProviderList().subscribe((data:Provider[])=>{
      // console.log(data);
      this.Providers = data;
    },(error)=>{
      console.log(error);
    })


  }
  hoy = new Date();
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddTaskPage');
    // console.log(this.myParam)
    console.log(this.hoy)
  }
  doSubmit(event) {
    console.log('Submitting form', this.langForm.value);
    event.preventDefault();
  }
  value(event){
  console.log(event.value)
  }
  addtask(){
    
    if(this.editing){
      this.task.DateCulminated = this.hoy
      this.taskService.updateTask(this.task);
      this.msgUpdate();
      this.navCtrl.setRoot(ListPage);
    }else{
      this.task.CreationDate = this.hoy;
      this.task.DateCulminated = this.hoy
      this.task.Status = this.Status
      this.task.boat = this.myParam
      this.taskService.addTask(this.task);
      this.msgAdd();
      this.navCtrl.setRoot(ListPage);
    }
  }
 
 //-----------------------------------------------------------------------------------Messages---------------------------------------------------------------------------------------//
 msgAdd() {

  const alert = this.alertCtrl.create({
    title: 'It was created correctly',
    buttons: ['OK']
  });
  alert.present();
}
msgUpdate() {

  const alert = this.alertCtrl.create({
    title: 'Edited correctly',
    buttons: ['OK']
  });
  alert.present();
}



}
