import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore) { }

//Student methods for auth
loginStudent(email, password){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}

signUpStudent(email, password){
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
}

createStudent(uid, data){
   //if uid then sabve data 
   this.afs.doc('student/'+uid).set(data)

}





  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  loginTeacher(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpTeacher(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createTeacher(uid, data){
     //if uid then sabve data 
     this.afs.doc('teachers/'+uid).set(data)

  }



  saveLocalData(uid){
     localStorage.setItem('uid', uid);
  }


}
