import { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  ArrowLeft,
  CheckCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ChatAreaProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    wa_id: string;
  };
  onBack?: () => void;
  selectedMessages: Message[];
  showBackButton?: boolean;
}

interface Message {
  id: string;
  content?: string;
  timestamp: string | number;
  isSent: boolean;
  contactId?: string;
  phoneNumber_id?: string;
  messages?: any;
  from?: string;
  text?: {
    body: string;
  };
}

export const ChatArea = ({
  contact,
  onBack,
  showBackButton = false,
  selectedMessages,
}: ChatAreaProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [businessPhoneId, setBusinessPhoneId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const number = '919937320320';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function formatTimestampToAMPM(unixSeconds: number | string): string {
    const date = new Date(
      typeof unixSeconds === 'string'
        ? parseInt(unixSeconds) * 1000
        : unixSeconds * 1000
    );
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  useEffect(() => {
    if (selectedMessages && selectedMessages.length > 0) {
      setMessages(selectedMessages[0].messages || []);
    }
  }, [selectedMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message.trim(),
        timestamp: Math.floor(Date.now() / 1000), 
        isSent: true,
        contactId: contact.id,
        phoneNumber_id: businessPhoneId,
        text: { body: message.trim() },
        from: number,
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-header-bg p-3 md:p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 md:hidden"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="relative flex-shrink-0">
            <Avatar className="w-9 h-9 md:w-10 md:h-10">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-online-status rounded-full border-2 border-header-bg" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-medium text-sm md:text-base truncate">
              {contact.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {contact.isOnline ? 'online' : 'last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
            <Video className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 md:w-10 md:h-10 hidden md:inline-flex"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
            <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-chat-bg p-3 md:p-4 space-y-2 md:space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg?.from === number ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-md px-3 md:px-4 py-2 rounded-lg shadow-sm ${
                msg.isSent
                  ? 'bg-message-sent text-message-sent-text rounded-br-sm'
                  : 'bg-message-received text-message-received-text rounded-bl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed break-words">
                {msg?.text?.body || msg?.content}
              </p>

              <div
                className={`flex items-center justify-end gap-1 mt-1 ${
                  msg.isSent
                    ? 'text-message-sent-text/70'
                    : 'text-muted-foreground'
                }`}
              >
                <span className="text-xs">
                  {formatTimestampToAMPM(msg?.timestamp)}
                </span>
                {msg.from !== number && (
                  <div className="flex">
                    <div className={`w-4 h-3 opacity-70 text-blue-600`}>
                      <CheckCheck className="w-auto h-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-header-bg p-3 md:p-4 border-t border-border">
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          >
            <Smile className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 hidden md:inline-flex"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-sidebar-bg border-0 focus-visible:ring-1 text-sm md:text-base py-2.5 md:py-3"
            />
          </div>
          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="w-8 h-8 md:w-10 md:h-10 bg-primary hover:bg-primary-dark flex-shrink-0"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
            >
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
