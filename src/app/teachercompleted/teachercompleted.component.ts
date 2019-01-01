
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ApiService } from '../api.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-teachercompleted',
  templateUrl: './teachercompleted.component.html',
  styleUrls: ['./teachercompleted.component.css']
})
export class TeachercompletedComponent implements OnInit {
  courses;
  selectedClass;
courseId;
public qrfile;
  xxx=''
  order: string = 'name';
  subscription: Subscription;
  constructor(private api: ApiService,private router:Router) { }

  ngOnInit() {
    let uid = localStorage.getItem('uid');
    this.api.getClasses(uid).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }).subscribe(resp=>{
      console.log(resp);
      this.courses =resp;
      console.log(this.courses);
    })
  }


  details(c){
    console.log(c);
    //this.router.navigate([`/dashboard/classes/${c.id}`]);
    this.router.navigate([`/dashboard/cpanel/${c.id}`]);
  }

  }


