import React, { useState, useEffect, useCallback } from 'react';
import type { Channel, Message } from './types';
import { CHANNELS } from './constants';
import { generateSummary, askQuestion } from './services/geminiService';
import Header from './components/Header';
import ChannelSelector from './components/ChannelSelector';
import ResponseDisplay from './components/ResponseDisplay';
import QuestionInput from './components/QuestionInput';

const App: React.FC = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChannelChange = useCallback((channelId: string) => {
    setSelectedChannelId(channelId);
    setMessages([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (!selectedChannelId) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      const channel = CHANNELS.find(c => c.id === selectedChannelId);
      if (!channel) {
        setError('Channel not found.');
        setIsLoading(false);
        return;
      }
      
      try {
        const summary = await generateSummary(channel.posts);
        setMessages([{
          id: `summary-${Date.now()}`,
          sender: 'ai',
          text: summary,
        }]);
      } catch (e) {
        console.error(e);
        setError('Failed to generate summary. Please check the API key and try again.');
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSummary();
  }, [selectedChannelId]);

  const handleQuestionSubmit = async (question: string) => {
    if (!question.trim() || !selectedChannelId) return;

    const userMessage: Message = { id: `user-${Date.now()}`, sender: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const channel = CHANNELS.find(c => c.id === selectedChannelId);
    if (!channel) {
      setError('Channel not found.');
      setIsLoading(false);
      return;
    }

    try {
      const answer = await askQuestion(channel.posts, question);
      const aiMessage: Message = { id: `ai-${Date.now()}`, sender: 'ai', text: answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error(e);
      setError('Failed to get an answer. Please check the API key and try again.');
      const aiErrorMessage: Message = { id: `ai-error-${Date.now()}`, sender: 'ai', text: '申し訳ありません、回答を生成できませんでした。' };
      setMessages(prev => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 p-6">
          <ChannelSelector
            channels={CHANNELS}
            selectedChannelId={selectedChannelId}
            onChannelChange={handleChannelChange}
          />
        </aside>
        <main className="flex-1 flex flex-col bg-gray-50">
          <ResponseDisplay messages={messages} isLoading={isLoading} error={error} hasChannelSelected={!!selectedChannelId} />
          <div className="p-4 border-t border-gray-200 bg-white">
            <QuestionInput onSubmit={handleQuestionSubmit} disabled={isLoading || !selectedChannelId} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;