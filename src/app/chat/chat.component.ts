import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Output() closeChatEmmiter = new EventEmitter();
  constructor( public chatService : ChatService) { }

  ngOnDestroy():void{
    this.chatService.stopChatConnection();
  }

  ngOnInit(): void {
    this.chatService.createChatConnection()
  }

  backToHome (){
    this.closeChatEmmiter.emit();
  }

  sendMessage(content:string){
    this.chatService.sendMessage(content);
  }

  

}
