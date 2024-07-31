import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference('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');

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  const bias = "short answer below 100 words. For more detailed insights on your KPIs, compliance scores, or to access reports, please check your personalized dashboard. *website is about compliance of bank of baroda bank* if user wants to know about guidelines, they should click on guidelines. If they have a query, they should click on help.";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: "Hello, how can I help you?", sender: 'ai' }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let aiResponse = "";
      for await (const chunk of hf.chatCompletionStream({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "user", content: inputMessage + bias },
        ],
        max_tokens: 500,
        temperature: 0.1,
        seed: 0,
      })) {
        if (chunk.choices && chunk.choices.length > 0) {
          aiResponse += chunk.choices[0].delta.content;
        }
      }

      setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <MessageSquare size={28} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 h-[32rem] flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Chat Support</h3>
            <button onClick={toggleChat} className="hover:bg-orange-700 p-1 rounded transition-colors duration-300">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-white text-gray-800 shadow-md'
                }`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-center">
                <div className="inline-block p-3 rounded-lg bg-gray-200">
                  <div className="dot-flashing"></div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-r-lg transition-colors duration-300"
                disabled={isLoading}
              >
                <Send size={24} />
              </button>
            </div>
          </form>
        </div>
      )}
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 1s;
        }
        @keyframes dot-flashing {
          0% { background-color: #9880ff; }
          50%, 100% { background-color: #ebe6ff; }
        }
      `}</style>
    </div>
  );
};

export default FloatingChatbot;