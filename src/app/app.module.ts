import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NewPage } from '../pages/new/new';
import { SendPage } from '../pages/send/send';
import { AccountsPage } from '../pages/accounts/accounts';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


  const fbConfig = {
    apiKey: "AIzaSyDMgNFK5N-9qE9WhvZrZpGT1JjhEl4VzII",
    authDomain: "doubleentry-24759.firebaseapp.com",
    databaseURL: "https://doubleentry-24759.firebaseio.com",
    projectId: "doubleentry-24759",
    storageBucket: "doubleentry-24759.appspot.com",
    messagingSenderId: "183196557807"
  };

@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    NewPage,
    SendPage,
    AccountsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(fbConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    NewPage,
    SendPage,
    AccountsPage,
    TabsPage
  ],
  providers: [
    HttpModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    FirebaseServiceProvider,
  ]
})
export class AppModule {}
