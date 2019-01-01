import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-studentheader',
  templateUrl: './studentheader.component.html',
  styleUrls: ['./studentheader.component.css']
})
export class StudentheaderComponent implements OnInit {
  notification
  selectedUser
  users
  notifications;
  selectedNotification;


  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getalerts(localStorage.getItem('uid')).subscribe(res=>{
      this.notifications=res;
      
    })
    
  }

  manageAlert(val){
    console.log(val);
    alert(val.description);
    this.api.setSeen(localStorage.getItem('uid'),val).then(res=>{
      this.api.removeLatest(localStorage.getItem('uid'),val);
      console.log("snt in seen");
    })
  }


}
