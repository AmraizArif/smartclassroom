import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $ :any;

@Component({
  selector: 'app-scpanel',
  templateUrl: './scpanel.component.html',
  styleUrls: ['./scpanel.component.css']
})
export class ScpanelComponent implements OnInit {
  class;
  //students:any =[{rollno:'SP14-BSE-000', name:'ALI ZAHID'}];
  assigments;
  notifications;
  quizes;
  classId;
  selectedAssignment;
  selectedQuiz;
  alerts=[];
  curval;
  tid;
  time;
  teacher:any=[];
  start=0.00
  end=1.00
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private toastrService: ToastrService) {
   
  //  this.Alert
  let id = this.route.snapshot.paramMap.get('id');
  this.classId = id;
  this.getStudentClass(id);
  
 
  
  console.log(id)
  
    
   }
  
  

  ngOnInit() {
    let d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    this.time=h+'.'+m;
  

    console.log(this.time)
    // this.curval=this.alerts[this.alerts.length-1].description;
    // console.log("this.curval");

  //   $( document ).hover(function() {
  //     $('#btn123').trigger('click');
  // });
  this.api.getNotifications(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }).subscribe(resp=>{
    console.log(resp);
    this.alerts =resp;
    console.log(this.alerts);
    this.toastrService.info(this.alerts[this.alerts.length-1].description);
   // console.log(this.alerts.length);
  })
  
  }

  
  

  showSuccess() {
    //this.toastr.success('New Notification', 'Success!');
    this.toastrService.info(this.alerts[this.alerts.length-1].description);
  }
 

  


  getStudentClass(id){
    this.api.getStudentClass(id).subscribe(res=>{
      this.class =res;
      this.api.getTeacherProfile(this.class.teacherId).subscribe(res=>{
        this.teacher=res;
        console.log(this.teacher);
        this.start=this.teacher.startTime;
        this.end=this.teacher.endTime;
            })
    })
 }


 
 details(c){
   if(this.time>=this.start&&this.time<=this.end){
  console.log(c);
this.api.sendMsg(this.class.teacherId);
  this.router.navigate([`/sdashboard/chat/${c}`]);}
  else{
    console.log("Error contact in office time");
    this.toastrService.error("PLEASE CONTACT IN OFFICE HOURS",'OOPS!')
  }
}


 ndetail(c){
  console.log(c);
  this.router.navigate([`/sdashboard/sclasses/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}

mdetail(c){
  console.log(c);
  this.router.navigate([`/sdashboard/sdiscussion/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}



qdetail(c){
  console.log(c);
  this.router.navigate([`/sdashboard/quiz/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}
//Get Course Notifications For Toast




}
