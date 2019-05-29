import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// interface
import { Boat } from '../../interface/boat';
// Service
import { BoatService } from '../../services/boat.service';


/**
 * Generated class for the AddBoatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-add-boat',
  templateUrl: 'add-boat.html',
})
export class AddBoatPage {

  boat : Boat = {
    Name: null,
    Sucursal: null,
    Status:null

  }
  id:string;
  editing :boolean = false;
  boats:any[]=[];
  boatList

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public boatService: BoatService,
              public alertCtrl: AlertController) {
                
                  // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage }
    ];
    this.id = navParams.get('id');
    console.log(this.id)

    if(this.id){

      this.editing = true;
      this.boatService.getBoatList().subscribe((data:Boat[])=>{
        this.boats = data
        this.boat = this.boats.find( (r)=> { return r.key == this.id} );
        console.log(this.boat)
      },(error)=>{
        console.log(error);
      })
     
      
  
      
     }
     else{
       this.editing = false;
     }
  }
  pages: Array<{title: string, component: any}>;
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBoatPage');
  }
  
  addBoat() {
    if(this.editing){
      this.boatService.updateBoat(this.boat);
      this.navCtrl.setRoot(ListPage);
      this.msgUpdate();
    }else{
    this.boatService.addBoat(this.boat);
    this.navCtrl.setRoot(ListPage);
    this.msgAdd();
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
      title: 'It was created correctly',
      buttons: ['OK']
    });
    alert.present();
  }


}
