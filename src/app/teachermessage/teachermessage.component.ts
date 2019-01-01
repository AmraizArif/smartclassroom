import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-teachermessage',
  templateUrl: './teachermessage.component.html',
  styleUrls: ['./teachermessage.component.css']
})
export class TeachermessageComponent implements OnInit {
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


   
   $(document).ready(function(){
     $("#myInput").on("keyup", function() {
       var value = $(this).val().toLowerCase();
       $("#myTable tr").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
       });
     });
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

