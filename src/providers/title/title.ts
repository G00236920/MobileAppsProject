
import { Injectable } from '@angular/core';

/*
  Generated class for the TitleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TitleProvider {

  currentAccount: string;

  constructor() {
    
  }

  
  setAccount(account: string){

    //set the title of the description page
    this.currentAccount = account;

  }

  getAccount():string{

    //return the title of the page
    return this.currentAccount;
    
  }

}
