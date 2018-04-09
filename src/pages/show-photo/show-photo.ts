import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-photo',
  templateUrl: 'show-photo.html',
})
export class ShowPhotoPage {

  imageName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPhotoPage');
  }

  showPhoto(){
    
    this.imageName = "https://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg";

  }

  goBack(){

    this.navCtrl.remove(2);
    
  }

}
