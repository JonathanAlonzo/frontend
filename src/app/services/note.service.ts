import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  //will get the endpoint: 'http://localhost:3000/'
  private urlRoot: string;
  private urlApi: string;

  constructor(private http: HttpClient) {
     //here is initializated endpoint variable
     this.urlRoot = environment.endpoint;
     this.urlApi = 'api/notes/';
   }  
  /*
    Get notes by User UID loged
    http://localhost:3001/api/notes/:uid
  */
 getNotesByUid(userUid_fk: string): Observable<Note[]>{
  return this.http.get<Note[]>(`${this.urlRoot}${this.urlApi}${userUid_fk}`)
 }

 //Method to DELETE 
 deleteNote(id: number): Observable<void>{
  return this.http.delete<void>(`${this.urlRoot}${this.urlApi}${id}`);
}

//Method to Save note (POST || CREATE)
saveNote(note: Note): Observable<void>{
  return this.http.post<void>(`${this.urlRoot}${this.urlApi}`, note);
}
//Get for Update (PUT)
getNote(id: number): Observable<Note>{
  return this.http.get<Note>(`${this.urlRoot}${this.urlApi}${id}`);
}

//UPDATE ON MODAL ELEMENT
updateNote(id: number, note: Note): Observable<void>{
  return this.http.put<void>(`${this.urlRoot}${this.urlApi}${id}`, note);
}

}