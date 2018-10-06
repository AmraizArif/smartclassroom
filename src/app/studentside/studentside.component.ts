import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-studentside',
  templateUrl: './studentside.component.html',
  styleUrls: ['./studentside.component.css']
})
export class StudentsideComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.removeItem('uid');
    this.router.navigate(['/landing'])
    
  }

  sidebar=[
    {icon:'dashboard', url:'/sdashboard', text:'Dashboard'},
    {icon:'person', url:'/sdashboard/profile', text:'Profile'},
    {icon:'local_pharmacy', url:'/sdashboard/sclasses', text:'Classes'},
    // {icon:'local_pharmacy', url:'/dashboard/setting', text:'Setting'},
    // {icon:'local_pharmacy', url:'/dashboard/help', text:'Help'},
    // {icon:'local_hospital', url:'/dashboard/doctors', text:'Doctors'},
    // {icon:'wc', url:'/dashboard/guardians', text:'Guardians'},
    // {icon:'nature_people', url:'/dashboard/workers', text:'Workers'},
    // {icon:'nature_people', url:'/dashboard/campaigns', text:'Campaigns'},
    // {icon:'nature_people', url:'/dashboard/notifications', text:'Notifications'},
    // {icon:'nature_people', url:'/dashboard/queries', text:'Queries'},
  ]

}
