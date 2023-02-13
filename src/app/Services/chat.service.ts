import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timestamp } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  myName : string ='';
  private chatConnection?: HubConnection;
  onlineUsers : string[] = [];
  messages : Message[] =[];
 

  


  constructor(private httpClient: HttpClient, private modalService : NgbModal) {

   }


   registerUser(user: User){
    return this.httpClient.post(`${environment.apiUrl}api/room/register`,user,{responseType:'text'});
   }

   createChatConnection(){
    this.chatConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}hubs/chat`).withAutomaticReconnect().build();
    this.chatConnection.start().catch(error =>{
      console.log(error);
      
    });
    this.chatConnection.on('UserConnected', ()=>{      
      this.addUserConnectionId();      
    });
    this.chatConnection.on('OnlineUsers', onlineUsers => {
      this.onlineUsers = [...onlineUsers];
    });

    this.chatConnection.on('NewMessage', (newMessage : Message) => {      
      if(this.messages.length > 50){
        this.messages.shift();
      }
      this.messages =[...this.messages, newMessage];
      
      
    });

    

   

    


    
   }

   stopChatConnection(){
    this.chatConnection?.stop().catch(error => {
      console.log(error);
      
    });
   }
   async addUserConnectionId(){
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName).catch(error => console.log(error));
   }

   async sendMessage (content:string){
    
    let timeStamp = new Date().toLocaleTimeString();
    const message :Message ={
      from: this.myName,
      content,
      timeStamp : timeStamp.toString()
      
    };
 
    
    return this.chatConnection?.invoke('ReceiveMessage', message).catch(error =>{
      console.log(error);
      
    });
   }


   
   


}
