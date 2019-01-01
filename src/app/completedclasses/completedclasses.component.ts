
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ApiService } from '../api.service';
import{QrcodereaderService} from '../qrcodereader.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-completedclasses',
  templateUrl: './completedclasses.component.html',
  styleUrls: ['./completedclasses.component.css']
})
export class CompletedclassesComponent implements OnInit {
  courses;
  selectedClass;
courseId;
public qrfile;
  xxx=''
  order: string = 'name';
  subscription: Subscription;
  constructor(private api: ApiService,private router:Router,private qr:QrcodereaderService) { }

  ngOnInit() {
    let uid = localStorage.getItem('uid');
    this.api.getStudentClasses(uid).map(actions => {
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

}
