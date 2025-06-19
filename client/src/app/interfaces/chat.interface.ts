export interface Message {
  _id?: string;
  content: string;
  senderId: string;
  timestamp: Date;
  chatId?: string;
}

export interface LastMessage extends Message {
  // Inherits all Message properties
}

export interface Chat {
  _id: string;
  participants: string[];
  content: string;
  lastMessage: LastMessage | null;
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatParticipant {
  userId: string;
  user?: User;
}

export interface NewMessageEvent {
  chatId: string;
  newMessage: Message;
}

export interface ChatDeleteResult {
  success: boolean;
  message?: string;
}

export interface ChatItemComponentState {
  senderData: User | null;
  senderImage: string;
  senderName: string;
  lastMessageTime: string;
  lastMessage: Message | null;
  isLoading: boolean;
}

export interface ChatResponse {
  chats: Chat[];
  success: boolean;
  message?: string;
}

export interface MessagesResponse {
  messages: Message[];
  chat?: Chat;
  success: boolean;
  message?: string;
}
