import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-questionpanel',
  templateUrl: './questionpanel.component.html',
  styleUrls: ['./questionpanel.component.css']
})
export class QuestionpanelComponent implements OnInit {

  public id;
  Answers;
  question;

  aid=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('c');
    console.log(this.id);

    this.api.getQuestion(this.id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
  
    }).subscribe(resp=>{
      this.question =resp;
      console.log(resp);
    })

    this.api.getAllAnswers(this.id).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
  
    }).subscribe(resp=>{
      console.log(resp);
      this.Answers =resp;
    })
    

    
  }



  submitAnswer(val){


    console.log(val);

//val.file=this.downloadURL;
// val.urlnew=this.downloadURL;
val.qid=this.id;
    val.startDate = new Date().getUTCDate();
    val.aid=this.aid;
    // val.classId = this.classId;
    // val.qid=this.qid;

    this.api.addAnswer(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }

}
