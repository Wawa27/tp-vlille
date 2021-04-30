import {Component, OnInit} from '@angular/core';
import {MessageType} from '../../enums/message-type.enum';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: []
})
export class PopupComponent {

  constructor(public messageService: MessageService) { }

  /**
   * Get classes from a message type
   * @param messageType The message's type
   */
  getClassesFromMessageType(messageType: MessageType): string {
    switch (messageType) {
      case MessageType.ERROR:
        return 'bg-red-200';
      case MessageType.SUCCESS:
        return 'bg-green-200';
      case MessageType.WARNING:
        return 'bg-yellow-200';
      default:
        return 'bg-red-200';
    }
  }
}
