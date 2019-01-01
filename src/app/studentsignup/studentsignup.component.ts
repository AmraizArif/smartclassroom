import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.css']
})
export class StudentsignupComponent implements OnInit {
  user={
    email:'',
    password:'',
    rollno:'',
    firstName:'',
    lastName:''
    
  }
  error;
  constructor(private router:Router, private api:ApiService) { }

  ngOnInit() {
  }


  login(){
    this.api.loginStudent(this.user.email, this.user.password).then(response=>{
      this.error ='';
      this.api.studentId = response.user.uid;
      this.api.student = response;
      localStorage.setItem('uid',response.user.uid);
      this.router.navigate(['dashboard']);
    }, err=>{
      this.error ='ERROR:'+err;
      setTimeout(()=>{
        this.error;
      },5000)

    })}
    signup(){
      this.api.signupStudent(this.user.email, this.user.password).then(response=>{
        this.error ='';
        this.api.studentId = response.user.uid;
        this.api.student = response;
        this.api.addStudentProfile(response.user.uid, {
          uid: response.user.uid,
          email: this.user.email,
          password: this.user.password,
          rollnum:this.user.rollno,
          firstName:this.user.firstName,
        lastName:this.user.lastName,
        }).then(ondone=>{
  
     
        localStorage.setItem('uid',response.user.uid);
        this.router.navigate(['sdashboard']);
      },onerror=>{
        this.error = 'ERROR'+onerror;
        setTimeout(()=> this.error,5000)
      })
      }, err=>{
        this.error ='ERROR:'+err;
        setTimeout(()=>{
          this.error;
        },5000)
  
      })
    
    }  

}
