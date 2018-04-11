import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {

  title: string;
  
  itemsList: any;

  showDebit: boolean = true;
  showCredit: boolean = false;
  titleButton = "Show Credit";
  state = "debited";
  bal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public titleName: TitleProvider, public afd: FirebaseServiceProvider, public CurrentImage: ImageServiceProvider) {
  
    this.title = this.titleName.getAccount();

    this.afd.getBalance(this.title).then(snap=>{

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

    this.CurrentImage.setPhoto(image);
    this.navCtrl.push(ShowPhotoPage);
    
  }

  creditAccount(){
    
    this.navCtrl.pop().then(value => {

      this.navCtrl.push(AddEntryPage);
      
    });

  }

  swap(){

    if(this.showDebit == true){

      this.showDebit = false;
      this.showCredit = true;

      this.state = "credited";

      this.titleButton = "Show Debit";

    }
    else{

      this.showDebit = true;
      this.showCredit = false;

      this.state = "debited";

      this.titleButton = "Show Credit";

    }
    
    this.itemsList = this.afd.getDetails(this.title, this.state);

  }

}
