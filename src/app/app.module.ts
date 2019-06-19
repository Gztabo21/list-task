import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// // for AngularFireAuth
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//component
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddBoatPage } from '../pages/add-boat/add-boat';
import { InitialPage } from '../pages/initial/initial';
import { TaskPage } from'../pages/task/task';
import { ProviderPage } from '../pages/provider/provider';
import { ProviderListPage } from '../pages/provider-list/provider-list';
import { UserPage } from '../pages/user/user';
import { AddTaskPage } from '../pages/add-task/add-task';
import { TaskListPage } from '../pages/task-list/task-list';
import { UserListPage } from '../pages/user-list/user-list';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file/ngx';


//services
import { BoatService } from '../services/boat.service';
import { ProviderService } from '../services/provider.service';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddBoatPage,
    AddTaskPage,
    InitialPage,
    TaskPage,
    ProviderPage,
    UserPage,
    ProviderListPage,
    TaskListPage,
    UserListPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFireAuthModule,   
    IonicModule.forRoot(MyApp),
    NgxErrorsModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddBoatPage,
    AddTaskPage,
    InitialPage,
    TaskPage,
    ProviderPage,
    UserPage,
    ProviderListPage,
    TaskListPage,
    UserListPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BoatService,
    ProviderService,
    TaskService,
    AuthService,
    AngularFireDatabase,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
