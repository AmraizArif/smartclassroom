import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  admin;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

    


    this.api.getTeacherProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.admin =resp;
      console.log(resp);
    });
  }


  resetPass(email){
  $('resetPass').modal('hide');
      this.api.resetPassword(email);
    
  }
  
  updateProfile(){
    this.api.updateTeacherProfile(this.api.adminId, this.admin).then(resp=>{
      console.log('Teacher Updated');
      alert(`Teacher profile updated`)
    })
  }

  logOut(){
    localStorage.removeItem('uid');
    this.router.navigate(['/landing'])
    
  }

}
