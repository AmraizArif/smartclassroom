import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-squestion',
  templateUrl: './squestion.component.html',
  styleUrls: ['./squestion.component.css']
})
export class SquestionComponent implements OnInit {
  public id;
  Answers;
  question;
  good;
  bad;
  ansid;
  num;
  voters=[1];
  selectedAnswer;
said;
add=1;
student;
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

this.api.getStudentProfile(this.api.studentId).subscribe(res=>{
this.student=res;
// console.log(this.student);
// console.log(this.student.firstName+this.student.lastName)
})

  }
  

  voteUp(selectedAnswer) {
    
    
    console.log(selectedAnswer.id);
    if(selectedAnswer.voters.indexOf(this.api.studentId)==-1){
      console.log(this.voters);
      this.voters.push(this.api.studentId);
    selectedAnswer.good=selectedAnswer.good+1;
    selectedAnswer.voters=this.voters;
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
      }

       submitAnswer(val) {


        console.log(val);
    
    // val.file=this.downloadURL;
    // val.urlnew=this.downloadURL;
    val.qid = this.id;
        val.startDate = new Date().getUTCDate();
        val.aid = this.aid;
        val.good=0;
        val.voters=this.voters;
        val.Name=this.student.firstName+this.student.lastName
        // val.classId = this.classId;
        // val.qid=this.qid;
    
        this.api.addAnswer(val).then(res => {
    
        }, err => {
          console.log(err);
        });
    
      }


  
}
