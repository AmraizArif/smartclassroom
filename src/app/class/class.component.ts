import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute,private router:Router,private storage:AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
title;
num;
  class;
  students:any =[{rollno:'SP15-BSE-000', name:'Ali Zahid'}];
  assigments;
  quizes;
  notifications;
  classId;
  selectedAssignment;
  selectedQuiz;
  selectedNotification;
  readingmaterial;
  selectedMaterial;
 public file;
 public filePath;
 public fileRef;
 public urlnew;
  public task;
  error;
  assignment={
    num:'',
    title:""
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.url)
    this.classId = id;
    this.getClass(id);
    console.log(id); 
    this.getAssigments();
    this.getQuizes();
    this.getMaterial();
    this.getNotification();
  }

  getClass(id){
     this.api.getClass(id).subscribe(res=>{
       this.class =res;

     })
  }



  //ASSIGMENT - GET

  getAssigments(){
    this.api.getAssigments(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.assigments =resp;
     
    })
  }

//Reading MAterial get set
getMaterial(){
  this.api.getspecificMaterial(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }).subscribe(resp=>{
    this.readingmaterial =resp;
  })
}
 // Material - ADD
 submitMaterial(val){
  $('#addMaterialModal').modal('hide')

  console.log(val);


val.urlnew=this.downloadURL;
  val.startDate = new Date().getUTCDate();
  val.classId = this.classId;

  this.api.addMaterial(val).then(res=>{

  },err=>{
    console.log(err);
  })

}


deleteMaterial(data){
  $('#deleteMaterialModal').modal('hide');
  this.selectedMaterial ={};
  //now removing the class
  this.api.deleteMAterial(data.id).then(res=>{

  }, err=>{})
}


updateMaterial(data){
  $('#editMaterialModal').modal('hide');
  data.urlnew=this.downloadURL;
  this.api.updateMaterial(data.id, data).then(res=>{

    this.selectedMaterial ={};
  });
}

updateNotification(data){
  $('#editNotificationModal').modal('hide');
  console.log(data.id);
  this.api.updateNotification(data.id, data).then(res=>{

    this.selectedNotification ={};
  });
}
//Notification Get Set
getNotification(){
  this.api.getNotifications(this.classId).map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return { id, ...data };
    })
  }).subscribe(resp=>{
    this.notifications =resp;
  })
}

submitNotification(val){
  $('#addNotificationModal').modal('hide')

  console.log(val);


  val.startDate = new Date().getUTCDate();
  val.classId = this.classId;

  this.api.addNotification(val).then(res=>{

  },err=>{
    console.log(err);
  })

}




  uploadFile(event) {
    this.file = event.target.files[0];
    //this.file = event.target.files[0];
 this.filePath = Math.random().toString(36).substring(2);;
   this.fileRef = this.storage.ref(this.filePath);
   this.task = this.fileRef.put(this.file);
   this.uploadPercent = this.task.percentageChanges();
   this.task.snapshotChanges().pipe(
    finalize(() => {
      this.fileRef.getDownloadURL().subscribe(url => {
        console.log(url); 
        this.downloadURL=url;// <-- do what ever you want with the url..
      });
    })
  ).subscribe();

 //console.log(this.downloadURL);
    // observe percentage changes
   
  }

  // Assigment - ADD
  submitAssignment(val){
    $('#addAssignmentModal').modal('hide')

    console.log(val);
//file upload 
  // fileUpload(val.file);
// val.file = <download_url>
//this.urlnew=this.downloadURL;






// get notified when the download URL is available
//this.fileRef.DownloadURL().then(function(url) {
 // console.log(url);
//});
//val.urlnew=this.downloadURL;

//this.urlnew=this.downloadURL;


//val.file=this.downloadURL;

if(this.downloadURL){
  val.urlnew=this.downloadURL;}
  else{
    val.urlnew=""
  }

    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;
val.creatorId=this.api.adminId;
    this.api.addAssigment(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  deleteAssignment(data){
    $('#deleteAssignmentModal').modal('hide');
    this.selectedAssignment ={};
    //now removing the class
    this.api.deleteAssigment(data.id).then(res=>{

    }, err=>{})
  }


  updateAssignment(data){
    $('#editAssignmentModal').modal('hide');
    this.api.updateAssigment(data.id, data).then(res=>{

      this.selectedAssignment ={};
    });
  }




  /* :::::: QUIZ ::::::::: */


  
  //Quiz - GET

  getQuizes(){
    this.api.getQuizes(this.classId).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        return { id, ...data };
      })

    }).subscribe(resp=>{
      this.quizes =resp;
    })
  }


  // Assigment - ADD
  submitQuiz(val){
    $('#addQuizModal').modal('hide')

    console.log(val);
    val.startDate = new Date().getUTCDate();
    val.classId = this.classId;

    this.api.addQuiz(val).then(res=>{

    },err=>{
      console.log(err);
    })

  }


  deleteQuiz(data){
    $('#deleteQuizModal').modal('hide');
    this.selectedQuiz ={};
    //now removing the class
    this.api.deleteQuiz(data.id).then(res=>{

    }, err=>{})
  }


  updateQuiz(data){
    $('#editQuizModal').modal('hide');
    this.api.updateClass(data.id, data).then(res=>{

      this.selectedQuiz ={};
    });
  }


}
