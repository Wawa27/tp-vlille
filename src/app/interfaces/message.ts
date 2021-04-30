import {MessageType} from '../enums/message-type.enum';

export interface Message {
  type: MessageType;
  text: string;
}
