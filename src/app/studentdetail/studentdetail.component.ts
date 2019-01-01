import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
class;
classId;
student:any=[];
std:any=[];
selectedstudent;
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
  }
  getClass(id){
    
    this.api.getClass(id).subscribe(res=>{
      this.class =res;
this.std=this.class.students;
console.log(this.std);
for(let some of this.std){
this.api.getStudentProfile(some).subscribe(res=>{
this.student.push(res);
console.log(this.student)

})
}
console.log(this.student);
    })
 }


 submitAlert(val){
   $('#addNotificationModal').modal('hide');
  //  console.log(this.selectedstudent.uid);
  //  console.log(val);
   let r = Math.random().toString(36).substring(7);
val.alertId=r;
val.courseName=this.class.courseName;
 this.api.sendAlert(this.selectedstudent.uid,val).then(res=>{
  this.student.pop(this,this.selectedstudent);
   this.selectedstudent={};
   
   alert("Alert sent successfully");
   this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
 })
 }
 
}
