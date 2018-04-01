import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TitleProvider } from '../../providers/title/title';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


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
  titleButton = "Credit";

  constructor(public navCtrl: NavController, public navParams: NavParams, public titleName: TitleProvider, public afd: FirebaseServiceProvider) {
  
    this.title = this.titleName.getAccount();
    
  }

  ngOnInit(){
    
    this.itemsList = this.afd.getDetails(this.title);
    
  }

  showDocument(){
    
  }

  addEntry(){

  }

  swap(){

    if(this.showDebit == true){
      this.showDebit = false;
      this.showCredit = true;

      this.titleButton = "Debit";

    }
    else{
      this.showDebit = true;
      this.showCredit = false;

      this.titleButton = "Credit";
    }
    
  }

}
