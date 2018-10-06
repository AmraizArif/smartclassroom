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
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private toastrService: ToastrService) {
   
  //  this.Alert
  let id = this.route.snapshot.paramMap.get('id');
  this.classId = id;
  this.getStudentClass(id);
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
   // console.log(this.alerts.length);
  })
 
  
  console.log(id)
  
    
   }
  
  

  ngOnInit() {
   
    // this.curval=this.alerts[this.alerts.length-1].description;
    // console.log("this.curval");

    $( document ).hover(function() {
      $('#btn123').trigger('click');
  });
  }

  Alert(){
    //stuff that doesn't do view changes
    this.toastrService.info(this.alerts[this.alerts.length-1].description);
  }
  

  showSuccess() {
    //this.toastr.success('New Notification', 'Success!');
    this.toastrService.info(this.alerts[this.alerts.length-1].description);
  }


  


  getStudentClass(id){
    this.api.getStudentClass(id).subscribe(res=>{
      this.class =res;

    })
 }


 ndetail(c){
  console.log(c);
  this.router.navigate([`/sdashboard/sclasses/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}



//Get Course Notifications For Toast




}
