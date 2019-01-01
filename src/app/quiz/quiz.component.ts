import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }

  selectedQuiz;
  quiz:any=[];
  questions;
  classId;
  teacherId;
  id;
  marks:any=[];
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.classId = this.id;
    this.teacherId=this.api.adminId;
    console.log("teacher is "+this.teacherId);
    console.log('calss id'+this.classId);
    this.getQuizzes();
    this.getMarks();
  }


submitQuiz(val){
  $('#addAssignmentModal').modal('hide')
  val.classId=this.classId;
  val.creatorId=this.teacherId;
  this.api.addQuiz(val).then(res=>{
console.log("quiz added succesfully");
  },err=>{
    console.log(err);
  })

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

  this.api.viewStudentMarks(this.selectedQuiz.id).subscribe(res=>{
    this.marks=res;
    console.log(this.marks);
  })
}
updateQuiz(data){
  $('#editAssignmentModal').modal('hide');
  this.api.updateQuiz(data.id, data).then(res=>{
console.log("quiz updated");
    this.selectedQuiz ={};
  });
}


deleteQuiz(data){
  $('#deleteAssignmentModal').modal('hide');
  this.selectedQuiz ={};
  //now removing the class
  this.api.deleteQuiz(data.id).then(res=>{
console.log("Delete Successful");
  }, err=>{})
}

}
