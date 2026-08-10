import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Doctor! I am MediAI Clinical Copilot. How can I assist you with clinical guidelines, dosage calculations, or patient symptom analysis today?',
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();

    const userMessage = input.trim();

    if (!userMessage) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: 'user',
        text: userMessage,
      },
    ]);

    setInput('');

    setTimeout(() => {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: 'ai',
          text: `Clinical Analysis for "${userMessage}": Based on standard clinical guidelines, monitor blood pressure hourly and maintain target SpO2 > 95%.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-medBlue" />
            <span>MediAI Clinical Intelligence Copilot</span>
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Real-time medical decision support system.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl">
          <Sparkles className="w-4 h-4 text-medBlue" />

          <span className="text-[10px] font-black text-medBlue uppercase tracking-wide">
            GPT-4 Medical Engine
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 min-h-[500px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={`${message.sender}-${index}`}
            className={`flex ${
              message.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs font-semibold leading-relaxed ${
                message.sender === 'user'
                  ? 'bg-medBlue text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Ask MediAI (e.g. Standard dosage for Amlodipine in hypertensive crisis)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medBlue/20"
        />

        <button
          type="submit"
          className="px-5 py-3 bg-medBlue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
