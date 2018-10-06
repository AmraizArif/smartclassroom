import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['./studentclass.component.css']
})
export class StudentclassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }
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
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
    //this.getQuizes();
    this.getMaterial();
    this.getNotification();
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
