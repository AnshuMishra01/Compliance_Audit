import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference('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')




const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bias= "short answer bellow 100 words For more detailed insights on your KPIs, compliance scores, or to access reports, please check your personalized dashboard ,*website is about compliance of bank of baroda bank* if user want to know about guidelines should click on guidelines have a querry he should click on help "
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: "Hello, how can I help you?", sender: 'ai' }]);
    }
  }, [isOpen, messages.length]);
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
          { role: "user", content: inputMessage+bias },
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
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg"
        >
          <MessageSquare size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat Support</h3>
            <button onClick={toggleChat}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && <div className="text-center">AI is thinking...</div>}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-lg p-2"
                disabled={isLoading}
              />
              <button type="submit" className="bg-orange-500 text-white px-4 rounded-r-lg" disabled={isLoading}>
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;