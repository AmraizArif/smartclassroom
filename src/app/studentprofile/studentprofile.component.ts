import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})

export class StudentprofileComponent implements OnInit {
student;
badge;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

    this.api.getStudentProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.student =resp;
      console.log(resp);
    this.checkBadge()
    });
  }
  checkBadge(){
    if(this.student.val==10){
      alert("you got a level 1 badge")
      console.log("You got level 1 badge");
      this.badge="Level 1"
    }
    if(this.student.val==20){
      alert("you got a level 2 badge")
      console.log("You got level 2 badge");
      this.badge="Level 2"
    }
    if(this.student.val==30){
      alert("you got a level 3 badge")
      console.log("You got level 3 badge");
      this.badge="Level 3"
    }
    if(this.student.val==40){
      alert("you got a level 4 badge")
      console.log("You got level 4 badge");
      this.badge="Level 4"
    }
  }

  resetPass(email){
    $('resetPass').modal('hide');
        this.api.resetPassword(email);
      
    }
  updateProfile(){
    this.api.updateStudentProfile(this.api.studentId, this.student).then(resp=>{
      console.log('Student Updated');
      alert(`Student profile updated`)
    })
  }


  logOut(){
    localStorage.removeItem('uid');
    this.router.navigate(['/landing'])
    
  }
 

}
