import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

import { ListPage }from'../list/list';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the InitialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})

export class InitialPage {
message:string;
loginForm: FormGroup;
  loginError: string;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthService,
    fb: FormBuilder) {
    this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

 

  ionViewDidLoad() {

    // this.firebaseAuthentication.createUserWithEmailAndPassword('test@gmail.com', '123')
    // .then((res: any) => console.log(res))
    // .catch((error: any) => console.error(error));
  
  }
  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(ListPage),
				error => this.loginError = error.message
			);
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
//   User;
//   password;

//   login(){
//     console.log(this.User+''+this.password)
//  if(this.User =='admin@admin.com' && this.password == '1234'){

//   this.navCtrl.setRoot(ListPage)
//  }else{
//   this.message= 'Contraseña o usuario incorrecto'
//  }
//   }
}
