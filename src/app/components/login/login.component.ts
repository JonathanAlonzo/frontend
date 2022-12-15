import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userServive: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //Will get the verify data user
  userVerifyCheck: User[] = [];

  onClick(){
    this.userServive.loginWithGoogle()//FirebaseLogingService
    .then(response => {
      const user: User = {
        user_name: response.user.displayName!,
        email: response.user.email!,
        photoUrl: response.user.photoURL!,
        uid: response.user.uid!
      }
      //Verify if the user exist
      console.log(response.user.uid);
      this.userServive.getUserByUid(response.user.uid).subscribe((data: User[]) => {
        this.userVerifyCheck = data;        
        if (data == null) {
            console.log('not exist and he can be register yet');
            this.userServive.registerUser(user).subscribe(() =>{
              console.log("User registred successfuly");
              const userUid = response.user.uid!;
              this.router.navigate(['/main/', userUid]);
            });
        } else {
          //console.log('This user already exist');
          const userUid = response.user.uid!;
          this.router.navigate(['/main/', userUid]);
        }
      });
    })
    .catch(error => console.log(error))
  }
}
