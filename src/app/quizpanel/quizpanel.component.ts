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
  selector: 'app-quizpanel',
  templateUrl: './quizpanel.component.html',
  styleUrls: ['./quizpanel.component.css']
})
export class QuizpanelComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage,private datePipe: DatePipe) { }
quizId;
quiz:any=[];
Marks=0;
curTime;
  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    var d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    this.curTime=h+'.'+m;
    console.log(this.quizId);
    this.api.getQuiz(this.quizId).subscribe(res=>{
      console.log(res);
      this.quiz=res;
      
    })
  }



  submitQuiz(val){
    if(this.curTime=this.curTime){
    if(val.correctans==this.quiz.correct1){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else
    {
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }
    if(val.correctans2==this.quiz.correct11){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }

    if(val.correctans3==this.quiz.correct111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }
    if(val.correctans4==this.quiz.correct1111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }

    if(val.correctans5==this.quiz.correct11111){
      console.log("answer is correct");
      this.Marks=this.Marks+1
    }
    else{
      console.log("Answer is wrong")
      this.Marks=this.Marks;
    }


    console.log(this.Marks)

val.title=this.quiz.title;
val.quizId=this.quizId;
val.classId=this.quiz.classId;
val.creatorId=this.api.studentId;
val.Marks=this.Marks;

this.api.submitQuiz(val);

    this.api.assignMarks(this.quiz.title,this.Marks);
    alert(`Quiz submitted`)
  }else{
    alert("time finished ");
  }}

}
