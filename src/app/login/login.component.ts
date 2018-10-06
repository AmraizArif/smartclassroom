import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user={
    email:'username@email.com',
    password:'anypass'
  }
error;  
correct={
  email:'username@gmail.com',
  password:'anypass'
}


  constructor(private router:Router, private api:ApiService) { }

  ngOnInit() {
  }

  resetPassword(email) {
    this.api.resetPassword(email)
  }


  login(){
    this.api.loginTeacher(this.user.email, this.user.password).then(response=>{

      this.api.getTeacherProfile(response.user.uid).subscribe(resp=>{
        if(resp){ /* if database has the user */
          this.error ='';
          this.api.adminId = response.user.uid;
          this.api.admin = response;
          localStorage.setItem('uid',response.user.uid);
          this.router.navigate(['dashboard']);
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
