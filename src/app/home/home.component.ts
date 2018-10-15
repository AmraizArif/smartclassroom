import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService) { }


  Classes;
  workers;
  guardians;
  assignment;
  
  ngOnInit() {
   this.api.getClasses(localStorage.getItem('uid')).subscribe(resp=>{
    this.Classes = resp.length;
   
  });
  this.api.getAllAssigments().subscribe(respx=>{
     this.assignment =respx.length;
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
  
  }

}
