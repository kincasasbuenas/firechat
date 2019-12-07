import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje:string="";
  element:any="";

  constructor(private _cs:ChatService) {
    this._cs.loadingMessages().subscribe(()=>{
      this.element.scrollTop = this.element.scrollHeight;
    });

    //this._cs.loadingMessages().subscribe((mensajes:any[])=>{
    //  console.log(mensajes);
    //})
  }

  ngOnInit() {
    this.element=document.getElementById('app-mensajes');
  }

  sendMessage(){
    if(this.mensaje.length===0)
    {
      return;
    }

    this._cs.sendMessage(this.mensaje)
            //.then(()=>console.log('mensaje enviado'))
            .then(()=>this.mensaje="")
            .catch((err)=>console.log('error enviando mensaje',err));
  }

}
