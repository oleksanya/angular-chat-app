export interface Chat {
  _id: string;
  participants: string[];
  content: string;
  lastMessage: {
    content: string;
    senderId: string;
    timestamp: Date;
  };
  messages: {
    content: string;
    senderId: string;
    timestamp: Date;
  }[];
}
