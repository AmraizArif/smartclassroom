import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { calcBindingFlags } from '@angular/core/src/view/util';
import { DatePipe } from '@angular/common';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['./studentclass.component.css']
})
export class StudentclassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage,private datePipe:DatePipe) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  class;
  students:any =[{rollno:'SP15-BSE-000', name:'Ali Zahid'}];
  assigments;
  quizes;
  notifications;
  classId;
  selectedAssignment;
  selectedQuiz;
  selectedNotification;
  readingmaterial;
  selectedMaterial;
 public file;
 public filePath;
 public fileRef;
 public urlnew;
  public task;
  date;
  student;
  sName;
  rollNo;
  firstName;lastName;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
    //this.getQuizes();
    this.getMaterial();
    this.getNotification();

    this.api.getStudentProfile(this.api.studentId).subscribe(res=>{
      this.student=res;
      this.sName=this.student.firstName+"&nbsp"+this.student.lastName;
      this.rollNo=this.student.rollNo;
      })
       let d=new Date();
       this.date=this.datePipe.transform(d,"yyyy-MM-dd");
  }

  getClass(id){
    this.api.getStudentClass(id).subscribe(res=>{
      this.class =res;

    })
 }


//Get Course Assignments
getAssigments(){
  this.api.getAssigments(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })

  }).subscribe(resp=>{
    this.assigments =resp;
  })
}

uploadFile(event) {
  this.file = event.target.files[0];
  //this.file = event.target.files[0];
this.filePath = Math.random().toString(36).substring(2);;
 this.fileRef = this.storage.ref(this.filePath);
 this.task = this.fileRef.put(this.file);
 this.uploadPercent = this.task.percentageChanges();
 this.task.snapshotChanges().pipe(
  finalize(() => {
    this.fileRef.getDownloadURL().subscribe(url => {
      console.log(url); 
      this.downloadURL=url;// <-- do what ever you want with the url..
    });
  })
).subscribe();

//console.log(this.downloadURL);
  // observe percentage changes
 
}
submitAssignment(val){
  console.log(val);
  // if(this.date=val.deadline)
  val.student=this.api.studentId;
  val.aid=val.id;
  val.sid=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  val.sName=this.sName;
  val.rollNo=this.rollNo;
  val.downloadURL=this.downloadURL;
   let sdate=new Date()
   val.date==this.datePipe.transform(sdate,"yyyy-MM-dd");
   this.api.submitAssignment(val).then(r=>{
     alert("Assignment Submitted");
   })
}

//Get Course Reading Material
getMaterial(){
  this.api.getspecificMaterial(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }).subscribe(resp=>{
    this.readingmaterial =resp;
  })
}


//Get Course Notifications


getNotification(){
  this.api.getNotifications(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }).subscribe(resp=>{
    this.notifications =resp;
  })
}



}
