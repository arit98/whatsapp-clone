"use client"
import { ChatArea } from "@/components/chat-area";
import { ContactsList } from "@/components/contact-list";
import dbConnect from "@/config/db";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/whatsapp-messages");

      const results = res.data?.result || [];

      const flatMessages: any[] = [];

      results.forEach((item: any) => {
        const entries = item.metaData?.entry || [];
        entries.forEach((entry: any) => {
          entry.changes?.forEach((change: any) => {
            const value = change.value;
            const contact = value.contacts?.[0];
            const message = value.messages?.[0];

            if (!contact || !message) return;

            flatMessages.push({
              id: contact.wa_id,
              name: contact.profile?.name || contact.wa_id,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.profile?.name || contact.wa_id)}`,
              lastMessage: message.text?.body || '',
              timestamp: new Date(Number(message.timestamp) * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              messages: value.messages,
            });
          });
        });
      });

      const contactMap = new Map();

      flatMessages.forEach((item) => {
        const existing = contactMap.get(item.id);
        if (existing) {
          existing.messages.push(...item.messages);
          existing.lastMessage = item.messages[item.messages.length - 1].text?.body || '';
          existing.timestamp = new Date(Number(item.messages[item.messages.length - 1].timestamp) * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        } else {
          contactMap.set(item.id, { ...item });
        }
      });
      console.log(Array.from(contactMap.values()));
      setData(Array.from(contactMap.values()));
    } catch (error) {
      console.error("Failed to fetch WhatsApp messages:", error);
    }
  };

  fetchData();
}, []);

  const handleSelectContact = (contact: any) => {
    setSelectedContact(contact);
    setShowChat(true);
  };

  const handleBackToContacts = () => {
    setShowChat(false);
    setSelectedContact(null);
  };

  useEffect(()=>{
    dbConnect();
  },[])
  return (
        <div className="flex h-screen bg-chat-bg overflow-hidden">
      {/* Mobile Responsive*/}

      {/* Contacts Sidebar */}
      <div className={`
        ${showChat ? 'hidden md:flex' : 'flex'} 
        w-full md:w-96 bg-sidebar-bg border-r border-border flex-col
      `}>
        <ContactsList 
          contacts={data}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>

      {/* Chat Area */}
      <div className={`
        ${showChat ? 'flex' : 'hidden md:flex'} 
        flex-1 flex-col
      `}>
        {selectedContact ? (
          <ChatArea
            contact={selectedContact} 
            onBack={handleBackToContacts}
            showBackButton={true}
            selectedMessages={data.filter((item) => item.id === selectedContact.id)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-chat-bg">
            <div className="text-center px-4">
              <div className="w-64 h-64 mx-auto mb-8 opacity-10">
                <svg viewBox="0 0 303 172" className="w-full h-full">
                  <defs>
                    <path id="a" d="M26.219 172h250.562V0H26.219z"/>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="b" fill="#fff">
                      <use xlinkHref="#a"/>
                    </mask>
                    <path fill="currentColor" mask="url(#b)" d="M249.484 15.491c-13.576 0-24.58 11.004-24.58 24.58v102.145c0 13.576 11.004 24.58 24.58 24.58h27.297V15.491h-27.297zM26.219 15.491v151.305h27.297c13.576 0 24.58-11.004 24.58-24.58V40.071c0-13.576-11.004-24.58-24.58-24.58H26.219z"/>
                    <path fill="currentColor" d="M249.484 0c-21.804 0-39.462 17.658-39.462 39.462v93.076c0 21.804 17.658 39.462 39.462 39.462h53.297V0h-53.297zM0 0v172h53.297c21.804 0 39.462-17.658 39.462-39.462V39.462C92.759 17.658 75.101 0 53.297 0H0z"/>
                  </g>
                </svg>
              </div>
              <h2 className="text-2xl font-light text-muted-foreground mb-2">
                WhatsApp Web
              </h2>
              <p className="text-muted-foreground max-w-md">
                Send and receive messages without keeping your phone online.<br/>
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
