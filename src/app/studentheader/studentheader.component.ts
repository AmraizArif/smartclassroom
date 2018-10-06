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
    
  }

}
