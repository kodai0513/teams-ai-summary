import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';

const GeminiIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.5a1.5 1.5 0 0 1 .88 2.84l5.12 3.66a1.5 1.5 0 0 1 0 2l-5.12 3.66a1.5 1.5 0 0 1-1.76 0L6.88 11a1.5 1.5 0 0 1 0-2l5.12-3.66A1.5 1.5 0 0 1 12 2.5Zm0 13a1.5 1.5 0 0 1 .88 2.84l5.12 3.66a1.5 1.5 0 0 1 0 2L12.88 24a1.5 1.5 0 0 1-1.76 0l-5.12-3.66a1.5 1.5 0 0 1 0-2l5.12-3.66A1.5 1.5 0 0 1 12 15.5Z" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center space-x-3">
    <GeminiIcon className="h-6 w-6 text-blue-500 animate-spin"/>
    <span className="text-sm text-gray-500">AI is thinking...</span>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
        <GeminiIcon className="h-16 w-16 mb-4 text-gray-300"/>
        <h2 className="text-lg font-semibold text-gray-700">AIアシスタントへようこそ</h2>
        <p>左のサイドバーからチャンネルを選択して、AIの要約を開始します。</p>
    </div>
);

// FIX: Define props interface for ResponseDisplay component.
interface ResponseDisplayProps {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    hasChannelSelected: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ messages, isLoading, error, hasChannelSelected }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {!hasChannelSelected ? (
                <InitialState />
            ) : (
                <div className="space-y-6">
                    {messages.map((message) => {
                       if (message.sender === 'ai') {
                           return (
                               <div key={message.id} className="flex items-start space-x-3">
                                   <div className="p-1 bg-blue-100 rounded-full">
                                       <GeminiIcon className="w-5 h-5 text-blue-600"/>
                                   </div>
                                   <div className="flex-1 p-3 rounded-lg bg-white text-gray-800 border border-gray-200">
                                       <p className="whitespace-pre-wrap">{message.text}</p>
                                   </div>
                               </div>
                           )
                       }
                       return (
                            <div key={message.id} className="flex justify-end">
                                <div className="max-w-2xl p-3 rounded-lg bg-blue-600 text-white">
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                       )
                    })}

                    {isLoading && (
                        <div className="flex items-start space-x-3">
                            <div className="p-1 bg-blue-100 rounded-full">
                                <GeminiIcon className="w-5 h-5 text-blue-600"/>
                            </div>
                            <div className="flex-1 p-3 rounded-lg bg-white text-gray-800 border border-gray-200">
                                <LoadingSpinner />
                             </div>
                        </div>
                    )}
                    
                    {error && (
                         <div className="flex justify-start">
                             <div className="max-w-2xl p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                                <p>{error}</p>
                             </div>
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
            )}
        </div>
    );
};

export default ResponseDisplay;