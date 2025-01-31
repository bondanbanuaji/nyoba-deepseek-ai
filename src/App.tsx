import { useState } from 'react';
import { MessageCard } from './components/MessageCard';
import ollama from 'ollama';
import './App.css'

type Message = {
  role: "assistant" | "user";
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you?" },
  ]);

  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // function ai
      const { message } = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
          newMessage
        ],
        stream: false
      });

      setMessages((prevMessages) => [...prevMessages, 
        { role: "assistant", content: message.content },
      ]);

      setInput("");
    }
  };

  return (
      <div className='flex flex-col h-screen bg-gray-100 py-20'>
        <main className='flex-grow overflow-hidden'>
          <div className='max-w-3xl mx-auto h-full flex flex-col'>
            <div className="flex-grow overflow-y-auto p-4 my-4 flex flex-col">
              {messages.map((message) => (
                <MessageCard role={message.role} message={message.content} />
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center p-4">
              <textarea
                placeholder="Ketikkan pesanmu disini"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow mr-2 p-4 border rounded-xl border-gray-300"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className='p-4 bg-blue-500 text-white rounded-xl'
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
  );
}

export default App;

