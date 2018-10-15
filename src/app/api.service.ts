import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class ApiService {
admin;
adminId;
student;
studentId;



  constructor(private afs:AngularFirestore,private fbAuth:AngularFireAuth) { 
    console.log(localStorage.getItem('uid'));
    this.adminId =localStorage.getItem('uid');
    this.studentId=localStorage.getItem('uid');
    
  
  }



  /* """"""""""""""""""""""""""""""""""""""""""""   AUTHENTICATION   """""""""""""""""""""""""""""""""""""""""""""""""""*/

  //~ LOGIN 
  loginTeacher(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass)
  }


  //~ SIGNUP
  signupTeacher(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }




  //Student Auth Details 
  loginStudent(email, pass){
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass);
  }


  //~ SIGNUP
  signupStudent(email, pass){
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  addStudentProfile(id, data){
    return this.afs.doc('students/'+id).set(data);
  }
  getStudentProfile(id){
    return this.afs.doc('students/'+id).valueChanges();

  }

  updateStudentProfile(id,data){
    return this.afs.doc('students/'+id).update(data);
  }

/* :::::::::::::::::::::::::::::::::::::::: TEACHER  :::::::::::::::::::::::::::::::::::: */

  getTeacherProfile(id){
    return this.afs.doc('teachers/'+id).valueChanges();

  }
  
  updateTeacherProfile(id,data){
    return this.afs.doc('teachers/'+id).update(data);
  }
  addTeacherProfile(id, data){
    return this.afs.doc('teachers/'+id).set(data);
  }

getTeachers(){
  return this.afs.collection('teachers').snapshotChanges();
}




//////Student Classs Enrolement and Get///////////





enrollStudent(classId,uid){
  return this.afs.collection('classes').doc(classId).update({
    "students":
      firebase.    firestore.FieldValue.arrayUnion(this.studentId)
    
    //students : this.studentId
  }
  )
}


getStudentClasses(studentId){
 return this.afs.collection('classes',ref=> ref.where('students','array-contains',studentId)).snapshotChanges();
 
}

getStudentClass(classId){
  return this.afs.doc('classes/'+classId).valueChanges();
}



/* ::::::::::::::::::::::::::::: CLASSES  :::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addClass(data){
  return this.afs.collection('classes').add(data)
}
//~ READ 

getClasses(teacherId){
  return this.afs.collection('classes', ref=> ref.where('teacherId','==',teacherId)).snapshotChanges();
}
getClass(classId){
  return this.afs.doc('classes/'+classId).valueChanges();
}
//~ UPDATE 
updateClass(id,data){
  return this.afs.doc('classes/'+id).update(data);
}
//~ DELETE 
deleteClass(id){
  return this.afs.doc('classes/'+id).delete();
}


/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ASSIGNMENTS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
 
//~ CREATE 
addAssigment(data){
  return this.afs.collection('assignments').add(data);
}
//~ READ 
getAllAssigments(){
  return this.afs.collection('assignments').snapshotChanges();
}
getAssigments(classId){
  return this.afs.collection('assignments', ref=> ref.where('classId','==',classId)).snapshotChanges();
}
//~ READ Single 
getAssigment(id){
  return this.afs.doc('assignments/'+id).snapshotChanges();
}
//~ UPDATE 
updateAssigment(id,data){
  return this.afs.doc('assignments/'+id).update(data);
}
//~ DELETE 
deleteAssigment(id){
  return this.afs.doc('assignments/'+id).delete();
}


//Reading Material Read and Create
addMaterial(data){
  return this.afs.collection('readingmaterial').add(data);
}

getallMaterial(){
  return this.afs.collection('readingmaterial').snapshotChanges;
}

getspecificMaterial(classId){
  return this.afs.collection('readingmaterial', ref=> ref.where('classId','==',classId)).snapshotChanges();
}

getMat(id){
  return this.afs.doc('readingmaterial/'+id).snapshotChanges();
}
//~ UPDATE 
updateMaterial(id,data){
  return this.afs.doc('readingmaterial/'+id).update(data);
}
//~ DELETE 
deleteMAterial(id){
  return this.afs.doc('readingmaterial/'+id).delete();
}


//Notification crud and toasts
addNotification(data){
  return this.afs.collection('notification').add(data);
}

getAllNotifications(){
  return this.afs.collection('notification').snapshotChanges();
}
getNotifications(classId){
  return this.afs.collection('notification', ref=> ref.where('classId','==',classId)).snapshotChanges();
}

getNotification(id){
  return this.afs.doc('notification/'+id).snapshotChanges();
}

updateNotification(id,data){
  return this.afs.doc('notification/'+id).update(data);
}

deleteNotification(id){
  return this.afs.doc('notification/'+id).delete();
}

/////////////////////////////////////////////DISCUSSION PANEL BACKEND CODE
////Get question context
getQuestion(qid){
  return this.afs.collection('discussion', ref=> ref.where('qid','==',qid)).snapshotChanges();
}



//Post Question
addQuestion(data){
  return this.afs.collection('discussion').add(data);
}

//Post Answer
addAnswer(data){
  return this.afs.collection('answer').add(data);
}


//Read Answers
getAllAnswers(qid){
  return this.afs.collection('answer', ref=> ref.where('qid','==',qid)).snapshotChanges();
}

//Read
getAllQuestions(classId){
  return this.afs.collection('discussion', ref=> ref.where('classId','==',classId)).snapshotChanges();
}


//Delete Question

deleteQuestion(id){
  return this.afs.doc('discussion/'+id).delete();
}



/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::DASH FUNCTIONS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


//Count Students
countStudents(teacherId){
  return this.afs.collection('classes', ref=> ref.where('teacherId','==',teacherId)).snapshotChanges();
}





//Show Students




/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: QUIZES  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

//~ CREATE 
addQuiz(data){
  return this.afs.collection('quizes').add(data);
}
//~ READ 
getAllQuizes(){
  return this.afs.collection('quizes').snapshotChanges();
}
getQuizes(classId){
  return this.afs.collection('quizes', ref=> ref.where('classId','==',classId)).snapshotChanges();
}
//~ READ Single 
getQuiz(id){
  return this.afs.doc('quizes/'+id).snapshotChanges();
}
//~ UPDATE 
updateQuiz(id,data){
  return this.afs.doc('quizes/'+id).update(data);
}
//~ DELETE 
deleteQuiz(id){
  return this.afs.doc('quizes/'+id).delete();
}




}