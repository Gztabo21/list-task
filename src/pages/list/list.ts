import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//pages
import { AddBoatPage } from '../add-boat/add-boat';
import { TaskPage }from '../task/task';
//interface
import { Boat } from '../../interface/boat';
//service
import { BoatService } from '../../services/boat.service' ;
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  
  icons: string[];

  boatList : any[]=[];
  boat;
  
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private boatService:BoatService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('items');
    
    // this.addBoat = this.navCtrl.push(AddBoatPage)
    // this.addBoad = navCtrl

    // Let's populate this page with some filler content for funzies
    // this.icons = ['boat'];
    // this.items = [];
    //         for (let i = 1; i < 11; i++) {
    //           this.items.push({
    //             title: 'Boad' + i,
    //             note: 'Task',
    //             icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //           });
    //         }

       this.boatService.getBoatList().subscribe((data:Boat[])=>{
         this.boatList = data
        
        //  console.log(this.boatList)
       },(error)=>{
         console.log(error);
       })
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  addPage(){
    this.navCtrl.push(AddBoatPage)
  }
  itemSelected(item) {
    // this.myParam = item.Name
    this.myParam = item.key
    this.boat =item.Name
  }
  deleteBoat(id){
     this.boatService.removeBoat(id);
    // console.log(id)
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

          this.deleteBoat(this.myParam);
        }
      }]
    });
    alert.present();
    console.log(alert );
  }


  myParam: string = '';
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
              this.navCtrl.push(AddBoatPage,{ 'id': this.myParam });
            }
          },
          {
            text: 'Tasks',
            icon: !this.platform.is('ios') ? 'clipboard' : null,
            handler: () => {
              this.navCtrl.push(TaskPage,{ 'idBoat': this.myParam,'boat': this.boat });
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
