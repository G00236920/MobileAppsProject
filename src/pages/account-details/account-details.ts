import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TitleProvider } from '../../providers/title/title';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AddEntryPage } from '../add-entry/add-entry';
import { ShowPhotoPage } from '../show-photo/show-photo';
import { ImageServiceProvider } from  '../../providers/image-service/image-service';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {

  title: string;
  
  itemsList: any;

  //Boolean to switch between the credit and debitson the account
  //Later i would switch this to card
  showDebit: boolean = true;
  showCredit: boolean = false;

  //Title that will be shown on the button
  titleButton = "Show Credit";

  //Variable to be passed to the firebase provider to show if debit or credit
  state = "debited";

  //The account balance
  bal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public titleName: TitleProvider, public afd: FirebaseServiceProvider, public CurrentImage: ImageServiceProvider) {
  
    this.title = this.titleName.getAccount();

    //Connect to firebase and retrieve the balance on the account
    this.afd.getBalance(this.title).then(snap=>{

      //Find the child of the account with the name balance and set this.bal to it
      this.bal = snap.child("balance").val();

      return this.bal;

    });
 
  }

  ionViewDidLoad() {

    this.itemsList = this.afd.getDetails(this.title, this.state);

    this.afd.getBalance(this.title).then(snap=>{

      this.bal = snap.child("balance").val();

      return this.bal;

    });
    
  }

  showDocument(image: any){

    //Used to set the image that will be shown when the user requests to see the document for an entry
    this.CurrentImage.setPhoto(image);
    //Push ShowPhotoPage to the stack, showing the page
    this.navCtrl.push(ShowPhotoPage);
    
  }

  creditAccount(){
    
    //POP all pages off the stack until root is found
    this.navCtrl.popToRoot().then(value => {
      //then push the addEntryPage to the stack
      this.navCtrl.push(AddEntryPage);

    });

  }

  swap(){

    //Switch between the debit and credit of an account
    //Set the button values and states, which are used when we call functions from the firebase provider
    if(this.showDebit == true){

      this.showDebit = false;
      this.showCredit = true;

      this.state = "credited";

      this.titleButton = "Show Debit";

    }
    else{

      //Switch to the credit side
      this.showDebit = true;
      this.showCredit = false;

      this.state = "debited";

      this.titleButton = "Show Credit";

    }
    
    //set the list of items, this will allow them to be printed to screen
    this.itemsList = this.afd.getDetails(this.title, this.state);

  }

}
