import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  // Construido como public para ser usado no templete
  constructor(public messageService: MessageService) {}
}
