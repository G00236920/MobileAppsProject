import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TitleProvider } from '../../providers/title/title';
import { AccountDetailsPage } from '../account-details/account-details';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  debitedAccount: string = "";
  creditedAmount: number = 0;
  entryDescription: string;
  base64Image: string;

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: FirebaseServiceProvider, public titleName: TitleProvider, private camera: Camera) {

    this.currentAccount = this.titleName.getAccount();
    this.accounts = this.afd.getAccounts();

  }

  addEntry(){

    if(this.currentAccount == this.debitedAccount){

      this.afd.popUp("You cannot Debit and Credit the same account", "error");

    }
    else if (this.getImage() == undefined){

      this.afd.popUp("You Must include an image of the Bill or Invoice", "error");

    }
    else if(this.debitedAccount.length == 0){

      this.afd.popUp("You must choose an account to Debit", "error");

    }
    else{

      this.afd.credit(this.debitedAccount, this.creditedAmount, this.currentAccount, this.entryDescription, this.getImage()); 

        this.navCtrl.push(AccountDetailsPage);
    
    }

  }

  takePhoto(){

    let image = this.camera.getPicture(this.options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;

     }, (err) => {

     });

  }

  getImage():string {

    return this.base64Image;
  }

}
