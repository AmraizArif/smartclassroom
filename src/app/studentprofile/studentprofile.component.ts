import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {
student;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {

    this.api.getStudentProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.student =resp;
      console.log(resp);
    });
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
