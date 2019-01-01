import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-questionpanel',
  templateUrl: './questionpanel.component.html',
  styleUrls: ['./questionpanel.component.css']
})
export class QuestionpanelComponent implements OnInit {

  public id;
  Answers;
  question;
  good;
  bad;
  ansid;
  num;
  selectedAnswer;
said;
add=1;
voters=[1];
  aid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   
   this.id = this.route.snapshot.paramMap.get('c');
    console.log(this.id);

    this.api.getQuestion(this.id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });

    }).subscribe(resp => {
      this.question = resp;
      console.log(resp);
    });

    this.api.getAllAnswers(this.id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });

    }).subscribe(resp => {
      console.log(resp);
      this.Answers = resp;
    });

  


  }

  voteUp(selectedAnswer) {
console.log(selectedAnswer.id)
if(selectedAnswer.voter.indexOf(this.api.adminId)==-1){
  this.voters.push(this.api.adminId);
selectedAnswer.good=selectedAnswer.good+1;
selectedAnswer.voter=this.voters;
console.log(selectedAnswer.good)

// val.good=val.good+1;
// let c=this.num;
// console.log(c)
 this.api.voteUp(selectedAnswer.id,selectedAnswer).then(res=>{

  console.log("value update"+selectedAnswer.good);
  selectedAnswer={};  
   });}
   else{
    alert("You cannot vote more than once on a single answer");
   }
// // // val.good=this.good+1;
// // // this.api.voteUp(val);
// // console.log(ansid);



  }
//   voteDown(selectedAnswer) {
// selectedAnswer.bad=selectedAnswer.bad+1;
// this.api.voteUp(selectedAnswer.id,selectedAnswer).then(res=>{

//   console.log("value update"+selectedAnswer.good);
//   selectedAnswer={};  
//    });

//   }

  submitAnswer(val) {


    console.log(val);

// val.file=this.downloadURL;
// val.urlnew=this.downloadURL;
val.qid = this.id;
    val.startDate = new Date().getUTCDate();
    val.aid = this.aid;
    val.good=0;
    val.voter=this.voters;
    // val.classId = this.classId;
    // val.qid=this.qid;

    this.api.addAnswer(val).then(res => {

    }, err => {
      console.log(err);
    });

  }

}
