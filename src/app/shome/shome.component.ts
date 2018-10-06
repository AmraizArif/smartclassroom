import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-shome',
  templateUrl: './shome.component.html',
  styleUrls: ['./shome.component.css']
})
export class ShomeComponent implements OnInit {

  constructor(private api:ApiService) { }
  Classes;
  workers;
  guardians;
  assignment;

  ngOnInit() {
    this.api.getStudentClasses(localStorage.getItem('uid')).subscribe(resp=>{
      this.Classes = resp.length;
    });
  }

}
