import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, of } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivatechatComponent implements OnInit {
class;
classId;
teacherId;
text;
teacher:any = {};
Message:any[]=[];
senderId;
sid;
disc;
tid;
sname:any=[];
  Msgs:any = [];
  Dmsg:any=[];
  Tmsg:any=[];
  m;
  d;
  fd;
  date;
  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router) { }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
  this.classId = id;
  this.date=new Date();
  this.m=this.date.getUTCMonth(),
  this.d=this.date.getUTCDate(),
  this.fd=this.d+"."+this.m;
  this.getStudentClass(id);
  this.getStudent();
 this.sid=this.api.studentId;
 this.api.getMessages(this.sid,this.classId).map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });

}).subscribe(resp => {
  console.log(resp);
  this.Message = resp;
  console.log(this.Message)
  this.disc=this.Message[this.Message.length-1];
  // console.log(this.disc.message)
});

// console.log(this.class.teacherId);
 
  }
  getStudentClass(id){
    let vm = this;
    this.api.getStudentClass(id).subscribe(res=>{
      vm.class =res;
      
      this.getTeacherName(vm.class.teacherId); 
    
      this.tid=vm.class.teacherId;
      this.getMyMessages(this.api.studentId,this.tid)

      
    })
    
 }

 

getTeacherName(teacherId){
  
  this.api.getTeacherProfile(teacherId).subscribe(res=>{
    this.teacher=res;
    console.log("Calling From Teacher Name: "+this.teacher.firstName);
    

  })
}


getMyMessages(sid,tid){
  console.log("Calling again Student check"+sid);
  console.log("Calling again fro check"+tid);

this.api.getMyMessages(sid,tid).subscribe(data =>{
  this.Msgs=data;
  console.log(this.Msgs.sent);
  this.Dmsg=this.Msgs.sent;
  this.Tmsg=this.Msgs.reply;
  console.log(this.Dmsg);
 
  // return this.Msgs['sent'];

})

    // console.log(this.disc.message)
  
  // let vm = this;
// setTimeout(function(){
//   console.log("Inside Timeout");
//   console.log(vm.Msgs);
// },2000)
  // this.api.getMyMessages(this.sid,this.classId)
  // .subscribe(resp => {
  //   console.log(resp);
  //   this.Msgs = resp["sent"];
   
  //   // console.log(this.disc.message)
  // });
  
}

getStudent(){
  this.api.getStudentProfile(this.api.studentId).subscribe(res=>{
    this.sname=res;
    console.log("Calling From Student Name: "+this.sname.firstName+this.sname.lastName);
    

  })
}



submitReply(val) {
  console.log(val.message);
  let minutes =new Date().getMinutes();
val.senderId=this.api.studentId;
val.teacherId=this.class.teacherId;
//val.message=this.message;
val.classId=this.classId;
val.className=this.class.courseName;
val.date=this.fd;
val.sname=this.sname.firstName+this.sname.lastName;
  
  val.startTime = new Date().getHours() +'::'+minutes;
  
 

  this.api.sendMessage(val,val.message).then(res => {

  }, err => {
    console.log(err);
  });

}

}






