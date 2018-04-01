
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

    this.currentAccount = account;

  }

  getAccount():string{

    return this.currentAccount;
    
  }

}
