export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isGroup?: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
  type?: 'text' | 'image' | 'file';
}

export interface Chat {
  contactId: string;
  messages: Message[];
}