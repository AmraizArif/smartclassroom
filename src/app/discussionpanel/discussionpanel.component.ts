import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-discussionpanel',
  templateUrl: './discussionpanel.component.html',
  styleUrls: ['./discussionpanel.component.css']
})
export class DiscussionpanelComponent implements OnInit {
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

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  ngOnInit() {
    let uid = localStorage.getItem('uid');
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.creatorid=uid;
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


  //Create Question
  submitQuestion(val){
    $('#addAssignmentModal').modal('hide')

    console.log(val);

//val.file=this.downloadURL;
// val.urlnew=this.downloadURL;
val.creatorid=this.creatorid;
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addQuestion(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }

//Get Full Question List in a course
getQuestions(){
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





}
