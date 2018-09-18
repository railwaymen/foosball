import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
  }

   saveItem(){

    let newUser = {
      name: this.name,
    };

    this.view.dismiss(newUser);

  }

  close(){
    this.view.dismiss();
  }


}
