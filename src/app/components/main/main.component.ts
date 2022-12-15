import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Note } from '../../interfaces/note';
import { UserService } from 'src/app/services/user.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  //Progress bar desactivated
  loading: boolean = false;

  //Will storage the user notes logged
  userLoggedInfo: any[] = [];
  allUserNotes: Note[] = [];

  //Use Reactive Forms Validations
  formNote: FormGroup;
  formNoteUpdate: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private noteService: NoteService,
    private route : ActivatedRoute,
    private router: Router,
    ) { 
      this.formNote = this.fb.group({
        //'initial value', Validadtion
        title: ['', Validators.required],
        content: ['', Validators.required],
      }),
      this.formNoteUpdate = this.fb.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        content: ['', Validators.required],
      })
  }
    
    ngOnInit(): void {
      const userUidLogged = this.route.snapshot.paramMap.get('uid');
      this.getNotesbyUserUid(userUidLogged);
      this.getCurrentUserUid(userUidLogged);
      
      //console.log(userUidLogged)
    }

    onClick(){
      this.userService.logout()
      .then(()=>{
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
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

  /* CRUD Functions */
  //CREATE note
  createNote(userUidLogged: string | null){
    const note: Note = {
      title: this.formNote.value.title,
      content: this.formNote.value.content,
      userUid_fk: userUidLogged!
    }
    console.log(note.content);
    this.loading = true;
    this.noteService.saveNote(note).subscribe(()=>{
      console.log('Note created successfuly');
      this.loading = false;
      this.getNotesbyUserUid(userUidLogged);
    });
  }

  //DELETE note
  deleteNote(id: number, userUidLogged: string | null){
    this.noteService.deleteNote(id).subscribe(()=>{
      console.log('Deleting...');
      console.log('NOTE DELETED.');
      this.getNotesbyUserUid(userUidLogged);
    })
  }

  updateNote(id: number, userUidLogged: string | null){

    const note: Note = {
      title: this.formNoteUpdate.value.title,
      content: this.formNoteUpdate.value.content,
      userUid_fk: userUidLogged!
    }
    
    this.noteService.updateNote(id, note).subscribe(() =>{
      this.getNotesbyUserUid(userUidLogged);
    })
  }

}
