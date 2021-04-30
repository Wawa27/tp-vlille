import {Injectable} from '@angular/core';
import {Message} from '../interfaces/message';

/**
 * Message service, messaged added to this service are removed after 2000ms
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  /**
   * Add a message, removed after 2000ms
   * @param message The message to add
   */
  public addMessage(message: Message): void {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.splice(this.messages.indexOf(message), 1);
    }, 2000);
  }
}
