import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AddTaskPage } from'../add-task/add-task'
/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import{ TaskService } from '../../services/task.service';
@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  myParam: string;
  idBoat: string;
  tasks:any[]=[]
  idTask:string;
  constructor(public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    private taskService:TaskService) {
    this.myParam = navParams.get('boat');
    this.idBoat = navParams.get('idBoat');


  this.showTask();

  }

  ionViewDidLoad() {

  }

  showTask(){
    this.taskService.getTaskList().subscribe((data:any[])=>{
      this.tasks = [];
      data.forEach(result=>{
        if(result.boat == this.idBoat && result.Status == false){
          this.tasks.push(result)

        }
      })
       
    })
  }

  itemSelected(item) {
    
    this.idTask = item.key;
console.log(this.idTask)
  }
 addTask(){
  //  this.navCtrl.push(AddTaskPage)
   this.navCtrl.push(AddTaskPage,{ 'Boat': this.idBoat });
 }
 deleteTask(id){
  this.taskService.removeTask(id);
}

confirmDelete() {
  const alert = this.alertCtrl.create({
    title: 'confirm',
    subTitle:'Do you want to delete this data?',
    buttons: [{
      text: 'NO',
      cssClass: 'method-color',
      handler: () => {
        console.log('no');
      }
    },
    {
      text: 'YES',
      cssClass: 'method-color',
      handler: () => {
        this.deleteTask(this.idTask);
        this.showTask();

      }
    }]
  });
  alert.present();

}

 presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    
      title: 'Boat',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.confirmDelete();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push( AddTaskPage ,{ 'idTask': this.idTask });
          }
        },
        
        // {
        //   text: 'Favorite',
        //   icon: !this.platform.is('ios') ? 'heart-outline' : null,
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
        {
          text: 'Close',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }


}
