import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Note } from '../../interfaces/note';
import { UserService } from 'src/app/services/user.service';
import { NoteService } from 'src/app/services/note.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  //Will storage the user notes logged
  userLoggedInfo: any[] = [];
  allUserNotes: Note[] = [];

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private route : ActivatedRoute,
    private router: Router,
    private afMessaging: AngularFireMessaging
  ) { }

  ngOnInit(): void {
    const userUidLogged = this.route.snapshot.paramMap.get('uid');
    this.getNotesbyUserUid(userUidLogged);
    this.getCurrentUserUid(userUidLogged);
  }

  //Get user loged
  getCurrentUserUid(userUidLogged: string | null){
    this.userService.getUserByUid(userUidLogged!).subscribe((data: User[])=>{
      console.log(data);
      this.userLoggedInfo.push(data);
    })
  }

  //Get notes by userUidLoged
  getNotesbyUserUid(userUidLogged: string | null){
    this.noteService.getNotesByUid(userUidLogged!).subscribe((data: Note[]) => {
      this.allUserNotes = data;
      console.log(data);
    })
  }

  onClick(){
    this.userService.logout()
    .then(()=>{
      this.router.navigate(['login']);
    })
    .catch(error => console.log(error));
  }

  rrequestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },  
      );
  }

  getTOken() {
    this.afMessaging.getToken.subscribe((res) => console.log('Token: ', res))
  }
}