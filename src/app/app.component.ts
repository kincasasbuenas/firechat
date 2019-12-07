import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ChatService} from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chats: Observable<any[]>;
  title="X-Chat";
  constructor(db: AngularFirestore,public _cs:ChatService) {
    this.chats = db.collection('chats').valueChanges();
  }
}
