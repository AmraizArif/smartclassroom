import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  user={
    email:'studentuser@email.com',
    password:'anypass'

  }
error;  
  constructor(private router:Router, private api:ApiService) { }

  ngOnInit() {
  }

  resetPassword(email) {
    this.api.resetPassword(email)
  }


  login(){
    this.api.loginStudent(this.user.email, this.user.password).then(response=>{

      this.api.getStudentProfile(response.user.uid).subscribe(resp=>{
        if(resp){ /* if database has the user */
          this.error ='';
          this.api.studentId = response.user.uid;
          this.api.student = response;
          localStorage.setItem('uid',response.user.uid);
          this.router.navigate(['sdashboard']);
        }else{
          this.error ='ERROR: No user profile found in the database. Please signup with another ID';
          setTimeout(()=>{
            this.error;
          },5000)

        }
     
  
        
      })
    
    }, err=>{
      this.error ='ERROR:'+err;
      setTimeout(()=>{
        this.error;
      },5000)

    })
    // if(this.user.email=='moeidsaleem@gmail.com' && this.user.password == 'moeid123' ){
    //   this.error=''
    //   console.log(this.user);
    //   this.router.navigate(['dashboard'])
    // }else{
    //   this.error='Incorrect Credentials.'
    //   setTimeout(()=>{
    //     this.error;
    //   },5000)

    // }

  }
}
