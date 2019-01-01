import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-squiz',
  templateUrl: './squiz.component.html',
  styleUrls: ['./squiz.component.css']
})
export class SquizComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage,private datePipe: DatePipe) { }
  selectedQuiz;
  quiz:any=[];
  questions;
  classId;
  studentId;
  id;
  startTime;
  endTime;
  quizDate;
  curTime;
  curDate;
  marks:any=[];
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.classId = this.id;
    this.studentId=this.api.studentId;
    var date = new Date();
    var d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    this.curTime=h+'.'+m;
    
    console.log(this.curTime)
this.curDate=this.datePipe.transform(date,"yyyy-MM-dd");
console.log(this.curDate)
    console.log("student is "+this.studentId);
    console.log('calss id'+this.classId);
    this.getQuizzes();
    this.getMarks();
  }

  getQuizzes(){
    this.api.getQuizes(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
  
    }).subscribe(resp=>{
      this.quiz =resp;
      console.log(this.quiz)

    })
  }

  getMarks(){
    this.api.viewMarks(this.classId,this.api.studentId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
  
    }).subscribe(resp=>{
      this.marks =resp;
      console.log(this.marks)

    })
  }

Details(x){
  
  if(x.deadline==this.curDate&&this.curTime>=x.stime&&this.curTime<x.etime){
console.log("Date match");
this.router.navigate([`sdashboard/quiz/quizpanel/${x.id}`]);
  }
  else{
    console.log("Quiz date or time not match")
    alert("Quiz not started or has ended")
  
  }
}


}
