import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../../services/auth.service'

import { InitialPage } from '../../pages/initial/initial';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	signupError: string;
  form: FormGroup;
  
  constructor(public navCtrl: NavController,
		fb: FormBuilder,private auth: AuthService
,    public navParams: NavParams) {
      this.form = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        typeUser:['']
      });
  }

  ionViewDidLoad() {
   
  }
  signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
      password: data.password,
      typeUser: data.typeUser
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(InitialPage),
			error => this.signupError = error.message
		);
}

}
