
import { Injectable } from '@angular/core';

/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {

  currentImage: string;

  constructor() {
    
  }

  setPhoto(image: string){

    this.currentImage = image;

  }

  getPhoto(): string{

    return this.currentImage;

  }

}
