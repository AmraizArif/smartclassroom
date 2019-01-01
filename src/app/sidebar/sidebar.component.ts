import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
  }

logOut(){
  localStorage.removeItem('uid');
  this.router.navigate(['/landing'])
  
}


  sidebar=[
    {icon:'dashboard', url:'/dashboard/home', text:'Dashboard'},
    {icon:'person', url:'/dashboard/profile', text:'Profile'},
    {icon:'collections_bookmark', url:'/dashboard/classes', text:'Classes'},
    {icon:'books', url:'/dashboard/completed', text:'Expired Classes'},
    {icon:'message', url:'/dashboard/tmessage', text:'Messages'},
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
