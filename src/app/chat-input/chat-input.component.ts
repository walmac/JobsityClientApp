import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  content : string = '';
  @Output() contentEmmiter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(){

    if(this.content.trim() !== ""){
      
        this.contentEmmiter.emit(this.content);
       
    }
    this.content='';
  }
}
