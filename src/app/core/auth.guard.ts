import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | boolean {
//       if (this.auth.authenticated) { return true; }

//       console.log('access denied!')
//       this.router.navigate(['/login']);
//       return false

//   }
// }
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,private router: Router) {}


  canActivate() {
  if(localStorage.getItem('uid')){
    return true;
  }else{
    this.router.navigate(['landing']);
    return false;
  }
    
   }}
