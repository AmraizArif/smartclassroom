import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
date;
m;
d;
y;
fd;
  constructor(private api:ApiService,private router:Router) { }


  Classes;
  workers;
  guardians;
  assignment;
  quizzes;
  messahe:any=[];
  order: string = 'name';
  ngOnInit() {
    this.date=new Date();
    this.m=this.date.getUTCMonth(),
    this.d=this.date.getUTCDate(),
    this.fd=this.d+"."+this.m;
    console.log(this.fd);
    this.api.getClasses(localStorage.getItem('uid')).subscribe(resp=>{
    this.Classes = resp.length;
   
  });
  this.api.getAssigmentsNow().subscribe(respx=>{
     this.assignment =respx.length;
   });

   this.api.getQuizzessNow().subscribe(respx=>{
    this.quizzes =respx.length;
  });
  // this.api.getVaccines().subscribe(respxx=>{
  //   this.vaccines = respxx.length;
  // });
  // this.api.getWorkers().subscribe(workersx=>{
  //   this.workers = workersx.length;
  // })
  // this.api.getGuardians().subscribe(guard=>{
  //   this.guardians =guard.length;
  // })
  this.api.getTeacherMessage(localStorage.getItem('uid')).subscribe(resp=>{
    this.messahe=resp;
    console.log(this.messahe)
   
  })
  
  }
  orderBy(value){
    this.order = value;
  }
  details(c){
    console.log(c);
    this.router.navigate([`/dashboard/chat/${c}`])
    
  }
}
