import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  class;
  students:any =[{rollno:'SP14-BSE-088', name:'Moeid Saleem Khan'}];
  assigments;
  quizes;
  classId;
  selectedAssignment;
  selectedQuiz;
 public file;
 public filePath;
 public fileRef;
  task;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
    this.getQuizes();
  }

  getClass(id){
     this.api.getClass(id).subscribe(res=>{
       this.class =res;

     })
  }



  //ASSIGMENT - GET

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
    this.file = event.target.files[0];
 this.filePath = 'assignment'+Math.random().toString(36).substring(2);;
   this.fileRef = this.storage.ref(this.filePath);
    

    // observe percentage changes
   
  }

  // Assigment - ADD
  submitAssignment(val){
    $('#addAssignmentModal').modal('hide')

    console.log(val);
//file upload 
  // fileUpload(val.file);
// val.file = <download_url>
//this.urlnew=this.downloadURL;

const task = this.storage.upload(this.filePath, this.file);
this.uploadPercent = task.percentageChanges();
// get notified when the download URL is available
task.snapshotChanges().pipe(
    finalize(() => this.downloadURL = this.fileRef.getDownloadURL() )
 )
.subscribe()

//this.urlnew=this.downloadURL;


val.file=this.downloadURL;

    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addAssigment(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  deleteAssignment(data){
    $('#deleteAssignmentModal').modal('hide');
    this.selectedAssignment ={};
    //now removing the class
    this.api.deleteAssigment(data.id).then(res=>{

    }, err=>{})
  }


  updateAssignment(data){
    $('#editAssignmentModal').modal('hide');
    this.api.updateAssigment(data.id, data).then(res=>{

      this.selectedAssignment ={};
    });
  }




  /* :::::: QUIZ ::::::::: */


  
  //Quiz - GET

  getQuizes(){
    this.api.getQuizes(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.quizes =resp;
    })
  }


  // Assigment - ADD
  submitQuiz(val){
    $('#addQuizModal').modal('hide')

    console.log(val);
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addQuiz(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  deleteQuiz(data){
    $('#deleteQuizModal').modal('hide');
    this.selectedQuiz ={};
    //now removing the class
    this.api.deleteQuiz(data.id).then(res=>{

    }, err=>{})
  }


  updateQuiz(data){
    $('#editQuizModal').modal('hide');
    this.api.updateClass(data.id, data).then(res=>{

      this.selectedQuiz ={};
    });
  }


}
