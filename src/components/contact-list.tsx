import { Search, MessageSquare, MoreVertical, Archive } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Contact } from '../types/whatsapp';
import { useState } from 'react';

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export const ContactsList = ({ contacts, selectedContact, onSelectContact }: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-header-bg p-3 md:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <Avatar className="w-9 h-9 md:w-10 md:h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
              <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-0 focus-visible:ring-1 text-sm"
          />
        </div>
      </div>

      {/* Filter Tabs - Hidden on small screens */}
      {/* <div className="hidden md:flex border-b border-border bg-sidebar-bg">
        <Button variant="ghost" className="flex-1 rounded-none py-3 text-sm font-medium">
          All
        </Button>
        <Button variant="ghost" className="flex-1 rounded-none py-3 text-sm">
          Unread
        </Button>
        <Button variant="ghost" className="flex-1 rounded-none py-3 text-sm">
          Groups
        </Button>
      </div> */}

      {/* Archive - Hidden on small screens */}
      <div className="hidden md:block px-4 py-3 border-b border-border bg-sidebar-bg hover:bg-secondary cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Archive className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium">Archived</span>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto bg-sidebar-bg">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center gap-3 p-3 md:p-4 cursor-pointer border-b border-border hover:bg-secondary transition-colors active:bg-secondary/80 ${
              selectedContact?.id === contact.id ? 'bg-secondary' : ''
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-11 h-11 md:w-12 md:h-12">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-online-status rounded-full border-2 border-sidebar-bg" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm md:text-base truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0">{contact.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
            </div>

            {contact.unreadCount > 0 && (
              <Badge variant="default" className="bg-primary text-primary-foreground text-xs min-w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                {contact.unreadCount}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};