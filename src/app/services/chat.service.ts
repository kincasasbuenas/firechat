import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mensaje} from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje []=[];
  public usuario:any={};

  constructor(private afs: AngularFirestore,public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      console.log('Estado del usuario',user);
      if(!user){
        return;
      }

      this.usuario.nombre=user.displayName;
      this.usuario.uid=user.uid;
      this.usuario.photo=user.photoURL;
    })
  }

  login(proveedor:string) {
    //para mas metodos de autenticacion utilizar un case
    console.log(proveedor);
    if(proveedor ==='google'){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    else if(proveedor ==='facebook'){
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
  }

  logout() {
    this.usuario={};
    this.afAuth.auth.signOut();
  }

  loadingMessages(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5));
    return  this.itemsCollection.valueChanges().pipe(map((mensajes:Mensaje[])=>{
      //console.log(mensajes);  
      //this.chats=mensajes;
      this.chats=[];
      for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
      }

      return this.chats;
    }))
  }

  sendMessage(texto:string){
    let mensaje:Mensaje={
      nombre:this.usuario.nombre,
      mensajes:texto,
      fecha: new Date().getTime(),
      uid:this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);
  }

}
