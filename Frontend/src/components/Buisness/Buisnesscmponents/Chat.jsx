// chat.jsx - Chat Page
import React from 'react';

function ChatPage() {
  return (
    <div className="w-full min-h-screen bg-white">

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        </div>
        </div>
      
      {/* Chat Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md flex h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="w-1/4 border-r">
            {/* Search */}
            <div className="p-4 border-b">
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            {/* Conversation List */}
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <div className="p-3 border-b bg-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">John Smith - TechCorp</p>
                    <p className="text-sm text-gray-600 truncate">Can you update me on the progress?</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">10:30 AM</p>
                    <span className="inline-block w-5 h-5 bg-blue-600 rounded-full text-white text-xs text-center leading-5">3</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Sarah Johnson - MarketBoost</p>
                    <p className="text-sm text-gray-600 truncate">Let's discuss the keyword strategy</p>
                  </div>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="p-3 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Mike Davis - Artisan Designs</p>
                    <p className="text-sm text-gray-600 truncate">I've sent the final payment</p>
                  </div>
                  <p className="text-xs text-gray-500">Mar 5</p>
                </div>
              </div>
              
              <div className="p-3 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Alex White - DigitalGrowth</p>
                    <p className="text-sm text-gray-600 truncate">Looking forward to our meeting tomorrow</p>
                  </div>
                  <p className="text-xs text-gray-500">Mar 3</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="w-3/4 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">John Smith - TechCorp</p>
                  <p className="text-xs text-gray-500">Website Redesign Project</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {/* Timestamp */}
                <div className="flex justify-center">
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Today, 10:30 AM</span>
                </div>
                
                {/* Received Message */}
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 flex-shrink-0"></div>
                  <div className="max-w-xs bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm">Hi there! Can you update me on the progress of our website redesign project?</p>
                    <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                  </div>
                </div>
                
                {/* Sent Message */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-gray-900 text-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm">Hi John! I've completed the homepage design and I'm working on the product pages now. I should have something to show you by tomorrow.</p>
                    <p className="text-xs text-gray-300 mt-1">10:32 AM</p>
                  </div>
                </div>
                
                {/* Received Message */}
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 flex-shrink-0"></div>
                  <div className="max-w-xs bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm">That sounds great! Will you be able to implement the shopping cart functionality as well?</p>
                    <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
                  </div>
                </div>
                
                {/* Sent Message */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-gray-900 text-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm">Yes, I'll start working on that next week. I'll need some API information from your team to connect with your payment processor.</p>
                    <p className="text-xs text-gray-300 mt-1">10:36 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 px-4 py-2 border rounded-md mx-2"
                />
                <button className="p-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  );
}

export default ChatPage;