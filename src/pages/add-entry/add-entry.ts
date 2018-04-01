import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TitleProvider } from '../../providers/title/title';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {

  accounts: any;
  currentAccount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider, public titleName: TitleProvider) {

    this.accounts = this.afd.getAccounts();
    this.currentAccount = this.titleName.getAccount();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }

  addEntry(){

  }

}
