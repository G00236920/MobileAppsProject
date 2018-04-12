import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageServiceProvider } from  '../../providers/image-service/image-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public CurrentImage: ImageServiceProvider) {

    //collect the name of the image from the imagename provider
    this.imageName = this.CurrentImage.getPhoto();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPhotoPage');
  }

  goBack(){

    //pop the last two navs off the stack
    this.navCtrl.remove(2);
    
  }

}
