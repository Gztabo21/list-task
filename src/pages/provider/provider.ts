import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Provider } from '../../interface/provider';
import { ProviderService } from '../../services/provider.service';
import {ListPage } from '../list/list';
/**
 * Generated class for the ProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html',
})
export class ProviderPage {
  provider : Provider = {
    key:null ,
    Name:null,
    Rif: null,
    Direccion:null,
    Telefono:null,
    Representante:null
  }

  id:string;
  editing :boolean = false;
  providers : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private providerServices : ProviderService,public alertCtrl: AlertController ) {
      this.id = navParams.get('id');

  }

  ionViewDidLoad() {
    this.verificarEdit();
  }
  verificarEdit(){
    if(this.id){

      this.editing = true;
      this.providerServices.getProviderList().subscribe((data:Provider[])=>{
        this.providers = data
        this.provider = this.providers.find( (r)=> { return r.key == this.id} );

      },(error)=>{
        console.log(error);
      })
    }
  }
  AddProvider(){

  
    this.navCtrl.setRoot(ListPage);
    if(this.editing){
      this.providerServices.updateProvider(this.provider);
      this.msgUpdate();
      this.navCtrl.setRoot(ListPage);
    }else{
      this.providerServices.addProvider(this.provider);
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
    title: 'edited correctly',
    buttons: ['OK']
  });
  alert.present();
}

}
