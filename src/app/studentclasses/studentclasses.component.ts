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
  selector: 'app-studentclasses',
  templateUrl: './studentclasses.component.html',
  styleUrls: ['./studentclasses.component.css']
})
export class StudentclassesComponent implements OnInit {

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
    })
  }

  // decode(file: any): Observable<string> {
  //   let vm = this;
  //   return new Observable(observer => {
       
  //     reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = (e: any) => {
  //           const data = e.target.result;
  //           qrcode.callback = (res) => {
  //             observer.next(res);
  //             observer.complete();
  //           };
  //           qrcode.decode(data);
  //         };
  //       });
  //     }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  uploadFile(event) {
    const file = event.target.files[0];
    this.subscription = this.qr.decode(file)
      .subscribe(decodedString =>{ this.qrfile=decodedString,console.log(this.qrfile);});
      
  }

  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e: any) => {
  //     console.info(e.target.result);
  //   }
  // }

 
  submit(val){
    $('#exampleModal').modal('hide');
   this.courseId=val.coursId;
   let uid= localStorage.getItem('uid');
    val.student = uid;
    console.log(val);
    this.api.enrollStudent(this.qrfile,uid);
  }
  details(c){
    console.log(c);
    
    this.router.navigate([`/sdashboard/scpanel/${c.id}`]);
  }
  

  orderBy(value){
    this.order = value;
  }

}
