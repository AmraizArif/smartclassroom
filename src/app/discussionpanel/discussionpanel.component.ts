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
id;
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
    val.qid=this.qid;

    this.api.addQuestion(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }

//Deleete and edit question
delete(data){
  $('#deleteModal').modal('hide');
  this.selectedquestion ={};
  //now removing the class
  this.api.deleteQuestion(data.id).then(res=>{

  }, err=>{})
}

update(data){
  $('#editModal').modal('hide');
  this.api.updateClass(data.id, data).then(res=>{

    this.selectedquestion ={};
  });
}
updateQuestion(data){
  $('#editQuestionModal').modal('hide');
  this.api.updateQuestion(data.id, data).then(res=>{

    this.selectedquestion ={};
  });
}


//Question Thread
details(c){
  console.log(c);
  //this.router.navigate([`/dashboard/classes/${c.id}`]);
  this.router.navigate([`/dashboard/discussion/question/${c}`]);
}


orderBy(value){
  this.order = value;
}


}
