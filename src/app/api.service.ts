import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { TouchSequence } from 'selenium-webdriver';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';

@Injectable()
export class ApiService {
admin;
adminId;
student;
studentId;
resp:any = [];



  constructor(private afs: AngularFirestore, private fbAuth: AngularFireAuth) {
    console.log(localStorage.getItem('uid'));
    this.adminId = localStorage.getItem('uid');
    // tslint:disable-next-line:whitespace
    this.studentId =localStorage.getItem('uid');


  }



  /* """"""""""""""""""""""""""""""""""""""""""""   AUTHENTICATION   """""""""""""""""""""""""""""""""""""""""""""""""""*/
//Private Mesagges

//Send Message
sendMessage(data,message){
  return this.afs.collection('sent').doc(this.studentId.concat(data.teacherId)).set({data,
    'sent':
      firebase.    firestore.FieldValue.arrayUnion(message)


    // students : this.studentId
  },
  {merge:true}
  );
}


sendMsg(tid){
  return this.afs.collection('sent').doc(this.studentId.concat(tid)).set({
    'sent':
      firebase.    firestore.FieldValue.arrayUnion("START TEST")
      


    // students : this.studentId
  },
  {merge:true}
  );
}

sendReply(data,message){
  return this.afs.collection('sent').doc(data.studentId.concat(this.adminId)).set({data,
    'reply':
    firebase.firestore.FieldValue.arrayUnion(message)
  },{merge:true});
}

//Recieve message
getMessages(studentId,classId) {
  return this.afs.collection('sent', ref => ref.orderBy('startTime').where('senderId', '==', studentId).where('classId','==',classId)).snapshotChanges();
}
// getMyMessages(studentId,teacherId):any{

//   let response:any = []; 
//   this.afs.collection('sent').doc(studentId.concat(teacherId)).snapshotChanges().subscribe(function(snapshot){
//     response.push(snapshot.payload.get("sent"));
//     // response=snapshot.payload.get("sent");
//     //response = snapshot.payload.get("sent");
//     console.log(snapshot.payload.get("sent"));
//   });
//   return response;
// }

getMyMessages(studentId,teacherId):any{
 
  return this.afs.collection('sent').doc(studentId.concat(teacherId)).valueChanges();
  
}

getTeacherMessage(teacherId){
  return this.afs.collection('sent', ref => ref.where('data.teacherId', '==', teacherId)).valueChanges();
}



//Get specific message
getMessage(id){
  return this.afs.doc('sent/'+id).valueChanges;
}
//Reply Message
replyMessage(data){
  return this.afs.collection('reply').add(data);
}
fetchReplies(id){
  return this.afs.collection('reply', ref => ref.where('id', '==', id)).snapshotChanges();
}
getReplies(id){
  return this.afs.doc('reply/'+id).valueChanges;
}
  // Question Review
  voteUp(id, data) {
    return this.afs.doc('answer/' + id).set(data);
  }



  // ~ LOGIN
  loginTeacher(email, pass) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email, pass);
  }


  // ~ SIGNUP
  signupTeacher(email, pass) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => alert(" reset email sent"))
      .catch((error) => console.log(error));
  }




  // Student Auth Details
  loginStudent(email, pass) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email, pass);
  }


  // ~ SIGNUP
  signupStudent(email, pass) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  addStudentProfile(id, data) {
    return this.afs.doc('students/' + id).set(data);
  }
  getStudentProfile(id) {
    return this.afs.doc('students/' + id).valueChanges();

  }

  updateStudentProfile(id, data) {
    return this.afs.doc('students/' + id).update(data);
  }

/* :::::::::::::::::::::::::::::::::::::::: TEACHER  :::::::::::::::::::::::::::::::::::: */

  getTeacherProfile(id) {
    return this.afs.doc('teachers/' + id).valueChanges();

  }

  updateTeacherProfile(id, data) {
    return this.afs.doc('teachers/' + id).update(data);
  }
  addTeacherProfile(id, data) {
    return this.afs.doc('teachers/' + id).set(data);
  }

getTeachers() {
  return this.afs.collection('teachers').snapshotChanges();
}

/////Alert from teacher to student /////

sendAlert(stdID,val){
  return this.afs.doc('students/' + stdID).update({
    'alerts':firebase.firestore.FieldValue.arrayUnion(val)}
  );
}


////// Student Classs Enrolement and Get///////////





enrollStudent(classId, uid) {
  return this.afs.collection('classes').doc(classId).update({
    'students':
      firebase.    firestore.FieldValue.arrayUnion(this.studentId)

    // students : this.studentId
  }
  );
}


getStudentClasses(studentId) {
 return this.afs.collection('classes', ref => ref.where('students', 'array-contains', studentId)).snapshotChanges();

}

// getCompletedClasses(studentId)
// {
//   return this.afs.collection('classes', ref => ref.where('students', 'array-contains', studentId)&& where('status':'completed')).snapshotChanges();
// }

getStudentClass(classId) {
  return this.afs.doc('classes/' + classId).valueChanges();
}



/* ::::::::::::::::::::::::::::: CLASSES  :::::::::::::::::::::::::::::::::::: */

// ~ CREATE
addClass(data) {
  return this.afs.collection('classes').add(data);
}
// ~ READ


getClasses(teacherId) {
  return this.afs.collection('classes', ref => ref.where('teacherId', '==', teacherId).orderBy("courseName", "asc")).snapshotChanges();
}
getClass(classId) {
  return this.afs.doc('classes/' + classId).valueChanges();
}
// ~ UPDATE
updateClass(id, data) {
  return this.afs.doc('classes/' + id).update(data);
}
// ~ DELETE
deleteClass(id) {
  return this.afs.doc('classes/' + id).delete();
}


// tslint:disable-next-line:max-line-length
/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ASSIGNMENTS  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

// ~ CREATE
addAssigment(data) {
  return this.afs.collection('assignments').add(data);
}
// ~ READ
getAllAssigments() {
  return this.afs.collection('assignments').snapshotChanges();
}

getAssigments(classId) {
  return this.afs.collection('assignments', ref => ref.where('classId', '==', classId).orderBy("num", "asc")).snapshotChanges();
}

//with creatore id 

getAssigmentsNow() {
  return this.afs.collection('assignments', ref => ref.where('creatorId', '==', this.adminId)).snapshotChanges();
}
// ~ READ Single
getAssigment(id) {
  return this.afs.doc('assignments/' + id).snapshotChanges();
}
// ~ UPDATE
updateAssigment(id, data) {
  return this.afs.doc('assignments/' + id).update(data);
}
// ~ DELETE
deleteAssigment(id) {
  return this.afs.doc('assignments/' + id).delete();
}
submitAssignment(data){
  return this.afs.collection('sassignments').add(data);
}

// Reading Material Read and Create
addMaterial(data) {
  return this.afs.collection('readingmaterial').add(data);
}

getallMaterial() {
  return this.afs.collection('readingmaterial').snapshotChanges;
}

getspecificMaterial(classId) {
  return this.afs.collection('readingmaterial', ref => ref.where('classId', '==', classId)).snapshotChanges();
}

getMat(id) {
  return this.afs.doc('readingmaterial/' + id).snapshotChanges();
}
// ~ UPDATE
updateMaterial(id, data) {
  return this.afs.doc('readingmaterial/' + id).update(data);
}
// ~ DELETE
deleteMAterial(id) {
  return this.afs.doc('readingmaterial/' + id).delete();
}


// Notification crud and toasts
addNotification(data) {
  return this.afs.collection('notification').add(data);
}

getAllNotifications() {
  return this.afs.collection('notification').snapshotChanges();
}


getNotifications(classId) {
  return this.afs.collection('notification', ref => ref.where('classId', '==', classId).orderBy("deadline", "asc")).snapshotChanges();
}

getNotification(id) {
  return this.afs.doc('notification/' + id).snapshotChanges();
}

updateNotification(id, data) {
  return this.afs.doc('notification/' + id).update(data);
}

deleteNotification(id) {
  return this.afs.doc('notification/' + id).delete();
}

///////////////////////////////////////////// DISCUSSION PANEL BACKEND CODE
//// Get question context
getQuestion(qid) {
  return this.afs.collection('discussion', ref => ref.where('qid', '==', qid)).snapshotChanges();
}



// Post Question
addQuestion(data) {
  return this.afs.collection('discussion').add(data);
}

// Post Answer
addAnswer(data) {
  return this.afs.collection('answer').add(data);
}
updateQuestion(id, data) {
  return this.afs.doc('discussion/' + id).update(data);
}


// Read Answers
getAllAnswers(qid) {
  return this.afs.collection('answer', ref => ref.where('qid', '==', qid).orderBy("good", "desc")).snapshotChanges();
}

// Read
getAllQuestions(classId) {
  return this.afs.collection('discussion', ref => ref.where('classId', '==', classId)).snapshotChanges();
}


// Delete Question

deleteQuestion(id) {
  return this.afs.doc('discussion/' + id).delete();
}



/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::DASH FUNCTIONS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


// Count Students
countStudents(teacherId) {
  return this.afs.collection('classes', ref => ref.where('teacherId', '==', teacherId)).snapshotChanges();
}


getalerts(studentId){
  return this.afs.doc('students/' + studentId).valueChanges();
 }
 setSeen(studentId,val){
  return this.afs.doc('students/' + studentId).update({
    'seen':firebase.firestore.FieldValue.arrayUnion(val)
 }
  );
 }
 removeLatest(studentId,val){
  return this.afs.doc('students/' + studentId).update({
    'alerts':firebase.firestore.FieldValue.arrayRemove(val)
 }
  );
 }

// Show Students




// tslint:disable-next-line:max-line-length
/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: QUIZES  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

// ~ CREATE
addQuiz(data) {
  return this.afs.collection('quizes').add(data);
}
// ~ READ
getAllQuizes() {
  return this.afs.collection('quizes').snapshotChanges();
}
getQuizes(classId) {
  return this.afs.collection('quizes', ref => ref.where('classId', '==', classId)).snapshotChanges();
}
// ~ READ Single
getQuiz(id) {
  return this.afs.doc('quizes/' + id).valueChanges();
}
// ~ UPDATE
updateQuiz(id, data) {
  return this.afs.doc('quizes/' + id).update(data);
}
// ~ DELETE
deleteQuiz(id) {
  return this.afs.doc('quizes/' + id).delete();
}
assignMarks(val,marks){
  console.log(val)
  return this.afs.collection('students/').doc(this.studentId).update({
    val:marks+marks
  });
}

getQuizzessNow() {
  return this.afs.collection('quizes', ref => ref.where('creatorId', '==', this.adminId)).snapshotChanges();
}

viewStudentMarks(qid){
  return this.afs.collection('studentquizes',ref=>ref.where('quizId','==',qid)).valueChanges();
}

submitQuiz(data){
  return this.afs.collection('studentquizes').add(data);
}

viewMarks(classId,sid){
  return this.afs.collection('studentquizes', ref => ref.where('classId', '==', classId).where('creatorId', '==', sid)).snapshotChanges();
}


}
