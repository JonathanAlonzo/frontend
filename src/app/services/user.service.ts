import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //will get the endpoint: 'http://localhost:3000/'
  private urlRoot: string;
  private urlUserApi: string;

  constructor(
    private auth: Auth,
    private http: HttpClient,//inject the client HTTP
  ) { 
    this.auth.onAuthStateChanged;
    //here is initializated endpoint variable
    this.urlRoot = environment.endpoint;
    this.urlUserApi = 'api/users/';
  }

   //Login with Google PopUp
   loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  //Logout
  logout(){
    return signOut(this.auth);
  }

  //Method to REGISTER new user
  registerUser(user: User): Observable<void>{
    return this.http.post<void>(`${this.urlRoot}${this.urlUserApi}`, user);
  }

  //Method to vefify id the user exist & get current user with UID
  getUserByUid(iud: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlRoot}${this.urlUserApi}${iud}`);
  }
}
