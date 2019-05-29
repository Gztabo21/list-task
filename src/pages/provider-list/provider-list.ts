import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ProviderPage } from '../provider/provider';

import { ProviderService } from '../../services/provider.service'

import { Provider } from '../../interface/provider';

/**
 * Generated class for the ProviderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-list',
  templateUrl: 'provider-list.html',
})

export class ProviderListPage {
  idProv: string = '';
  provider:any[];
  constructor(
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private providerService : ProviderService) {
  }

  ionViewDidLoad() {
this.showProviders();
  }
  itemSelected(item) {
    // this.myParam = item.Name
    this.idProv = item.key
  }

  showProviders(){
    this.providerService.getProviderList().subscribe((data:Provider[])=>{
      
      this.provider = data;
    },(error)=>{
      console.log(error);
    })
  }
  deleteProv(id){
    this.providerService.removeProvider(id);
   console.log(id)
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

          this.deleteProv(this.idProv);
        }
      }]
    });
    alert.present();

  }
  addPage(){
    this.navCtrl.push(ProviderPage)
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
              this.navCtrl.push(ProviderPage,{ 'id': this.idProv });
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
