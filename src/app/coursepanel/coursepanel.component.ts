import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-coursepanel',
  templateUrl: './coursepanel.component.html',
  styleUrls: ['./coursepanel.component.css']
})
export class CoursepanelComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }
  class;
  students:any =[{rollno:'SP14-BSE-000', name:'ALI ZAHID'}];
  assigments;
  quizes;
  classId;
  selectedAssignment;
  selectedQuiz;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.classId = id;
    this.getClass(id);
    console.log(id); 
  }
  getClass(id){
    this.api.getClass(id).subscribe(res=>{
      this.class =res;

    })
 }
 ndetail(c){
  console.log(c);
  this.router.navigate([`/dashboard/classes/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}

mdetail(c){
  console.log(c);
  this.router.navigate([`/dashboard/discussion/${c}`]);
  //this.router.navigate([`/dashboard/cpanel/${c.id}`]);
}

}
