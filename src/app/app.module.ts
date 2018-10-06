import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiService } from './api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

//extenals
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ClassesComponent } from './classes/classes.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ClassComponent } from './class/class.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CoursepanelComponent } from './coursepanel/coursepanel.component';
import { AuthService } from './auth.service';
import { AuthGuard} from './core/auth.guard';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { StudentsideComponent } from './studentside/studentside.component';
import { ShomeComponent } from './shome/shome.component';
import { StudentclassesComponent } from './studentclasses/studentclasses.component';
import { EnrolltestComponent } from './enrolltest/enrolltest.component';
import { ScpanelComponent } from './scpanel/scpanel.component';
import { StudentclassComponent } from './studentclass/studentclass.component';
import { DiscussionpanelComponent } from './discussionpanel/discussionpanel.component';
import{QrcodereaderService} from './qrcodereader.service';
import { StudentheaderComponent } from './studentheader/studentheader.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';




let ROUTES =[
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'landing', component:LandingComponent},
  {path:'statistics', component:HomeComponent},
  {path:'team', component:TeamComponent},
  {path:'about', component:AboutComponent },
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'sreg',component:StudentsignupComponent},
  {path:'slogin',component:StudentloginComponent},
  {path:'etest',component:EnrolltestComponent},
  {path:'sdashboard',component:StudentdashboardComponent,children:[
{path:'',redirectTo:'shome',pathMatch:'full'},
{path:'shome',component:ShomeComponent},
{path:'sclasses',component:StudentclassesComponent},
{ path: 'scpanel/:id', component: ScpanelComponent},
{ path: 'sclasses/:id' ,component:StudentclassComponent},
{path:'profile',component:StudentprofileComponent}
]
},
  {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard], children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    //real ones
    { path: 'classes', component: ClassesComponent,canActivate: [AuthGuard]},
    { path: 'classes/:id' ,component:ClassComponent},
    { path: 'setting', component: SettingComponent},
    { path: 'help', component: HelpComponent},
    { path: 'cpanel/:id', component: CoursepanelComponent},
    { path: 'discussion/:id' ,component:DiscussionpanelComponent},
    
]},
  


]

let firebaseConfig= {
  apiKey: "AIzaSyCKlQfSGOwucl0hBwVMMrEemNVGMaHCQPQ",
  authDomain: "university-management-fyp.firebaseapp.com",
  databaseURL: "https://university-management-fyp.firebaseio.com",
  projectId: "university-management-fyp",
  storageBucket: "university-management-fyp.appspot.com",
  messagingSenderId: "164013187253"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    LandingComponent,
    FooterComponent,
    ProfileComponent,
    TeamComponent,
    AboutComponent,
    //real ones
    ClassesComponent,
    SettingComponent,
    HelpComponent,
    ClassComponent,
    CoursepanelComponent,
    StudentsignupComponent,
    StudentloginComponent,
    StudentdashboardComponent,
    StudenthomeComponent,
    StudentsideComponent,
    ShomeComponent,
    StudentclassesComponent,
    EnrolltestComponent,
    ScpanelComponent,
    StudentclassComponent,
    DiscussionpanelComponent,
    StudentheaderComponent,
    StudentprofileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    OrderModule,
    ChartsModule,
    QRCodeModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    
  ],
  providers: [ApiService,AuthService,AuthGuard,QrcodereaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
