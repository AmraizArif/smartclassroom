import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-sdiscussion',
  templateUrl: './sdiscussion.component.html',
  styleUrls: ['./sdiscussion.component.css']
})
export class SdiscussionComponent implements OnInit {
  classId;
  questions;
  answers;
  creatorid;
  selectedquestion;
  latestquestion;
  urlnew;
  file;
  filePath;
  fileRef;
  task;
  id;
  student:any=[];
  sName;
  qid=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  order: string = 'name';
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  ngOnInit() {
    let uid = localStorage.getItem('uid');
    this.id = this.route.snapshot.paramMap.get('id');
     this.classId = this.id;
     this.creatorid=uid;
     
this.api.getStudentProfile(this.creatorid).subscribe(res=>{
this.student=res;
this.sName=this.student.firstName+"&nbsp"+this.student.lastName;
})

     this.api.getAllQuestions(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
  
    }).subscribe(resp=>{
      this.questions =resp;
    })
    
  }



  submitQuestion(val){
    $('#addAssignmentModal').modal('hide')

    console.log(val);

//val.file=this.downloadURL;
// val.urlnew=this.downloadURL;
val.creatorid=this.creatorid;
    val.startDate = new Date().toISOString().split('T')[0];
    val.classId = this.classId;
    val.qid=this.qid;
val.studentName=this.sName;
    this.api.addQuestion(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  delete(data){
    $('#deleteModal').modal('hide');
    if(this.selectedquestion.creatorid==this.creatorid){
    this.selectedquestion ={};
    //now removing the class
    this.api.deleteQuestion(data.id).then(res=>{
  
    }, err=>{})
  }
  else{
    alert("you didnt created this")
  }
  }
  
  update(data){
    $('#editModal').modal('hide');
    if(data.creatorid==this.creatorid){
    this.api.updateQuestion(data.id, data).then(res=>{
  
      this.selectedquestion ={};
    });
  }
  else{
    alert("You did not created this");
  }
  }
  
  //Question Thread
  details(c){
    console.log(c);
    //this.router.navigate([`/dashboard/classes/${c.id}`]);
    this.router.navigate([`/sdashboard/sdiscussion/question/${c}`]);
  }
  
  
  orderBy(value){
    this.order = value;
  }
  


}
