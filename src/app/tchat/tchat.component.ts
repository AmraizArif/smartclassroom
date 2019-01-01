import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, of } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit {

Smsg:any=[];
Tmsg:any=[];
sid;

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.sid=id;
    console.log(this.sid);
    this.api.getMyMessages(this.sid,this.api.adminId).subscribe(res=>{
this.Smsg=res.sent;
this.Tmsg=res.reply;
console.log(this.Tmsg)
console.log(this.Smsg)
    })
  }

  submitReply(val) {
   val.studentId=this.sid;
  console.log(val);
    this.api.sendReply(val,val.message).then(res => {
  
    }, err => {
      console.log(err);
    });
  
  }

}
