import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'freelancer', content: 'Hello! I have reviewed your project requirements.', timestamp: '10:30 AM' },
    { id: 2, sender: 'company', content: 'Great! Do you have any questions about the timeline?', timestamp: '10:32 AM' },
    { id: 3, sender: 'freelancer', content: 'Yes, I noticed the deadline is quite tight. Would it be possible to extend it by a week?', timestamp: '10:35 AM' },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('John Doe');
  const messagesEndRef = useRef(null);
  
  const chats = [
    { id: 1, name: 'John Doe', role: 'UI/UX Designer', status: 'online', unread: 0, lastMessage: '10:35 AM' },
    { id: 2, name: 'Sarah Miller', role: 'Full Stack Developer', status: 'offline', unread: 2, lastMessage: 'Yesterday' },
    { id: 3, name: 'Alex Chen', role: 'Content Writer', status: 'online', unread: 0, lastMessage: 'Yesterday' },
    { id: 4, name: 'Lisa Johnson', role: 'Mobile Developer', status: 'away', unread: 0, lastMessage: 'Monday' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'company',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Company Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div className="flex items-center">
              <img src="/api/placeholder/36/36" alt="Company Logo" className="w-8 h-8 rounded-full" />
              <span className="ml-2">Your Company</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden flex h-[75vh]">
          {/* Sidebar - Chat List */}
          <div className="w-1/4 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="w-full p-2 pl-8 border border-gray-300 rounded-lg text-sm"
                />
                <svg className="w-4 h-4 absolute left-2 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(75vh-72px)]">
              {chats.map((chat) => (
                <div 
                  key={chat.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${activeChat === chat.name ? 'bg-blue-50' : ''}`}
                  onClick={() => setActiveChat(chat.name)}
                >
                  <div className="flex items-start">
                    <div className="relative">
                      <img src="/api/placeholder/40/40" alt={chat.name} className="w-10 h-10 rounded-full" />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        chat.status === 'online' ? 'bg-green-500' : 
                        chat.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.lastMessage}</span>
                      </div>
                      <p className="text-xs text-gray-500">{chat.role}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-600 truncate">Last message preview...</p>
                        {chat.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt={activeChat} className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{activeChat}</h3>
                  <p className="text-xs text-gray-500">UI/UX Designer • Online</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'company' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'company' 
                        ? 'bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                        : 'bg-gray-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                    } p-3`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 text-right ${
                        message.sender === 'company' ? 'text-blue-200' : 'text-gray-500'
                      }`}>{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                <button type="button" className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="1"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel - Project Details */}
          <div className="w-1/4 border-l border-gray-200 hidden lg:block">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Project Details</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-xs uppercase text-gray-500 font-medium mb-2">Current Project</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium text-gray-800">Website Redesign</h3>
                  <p className="text-sm text-gray-600 mt-1">UI/UX overhaul of company website</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Deadline: April 15, 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xs uppercase text-gray-500 font-medium mb-2">Attachments</h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <div className="ml-2">
                      <p className="text-sm text-gray-800">Project_Brief.pdf</p>
                      <p className="text-xs text-gray-500">Shared yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <div className="ml-2">
                      <p className="text-sm text-gray-800">Budget_Details.xlsx</p>
                      <p className="text-xs text-gray-500">Shared 3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs uppercase text-gray-500 font-medium mb-2">Freelancer Info</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-3">
                    <img src="/api/placeholder/40/40" alt="John Doe" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800">John Doe</h3>
                      <p className="text-xs text-gray-500">UI/UX Designer</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>New York, USA</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>5 Years Experience</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                      <span>4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Freelancer Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;