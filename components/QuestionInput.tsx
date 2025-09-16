import React, { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled: boolean;
}

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
);


const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, disabled }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={disabled ? "チャンネルを選択してください..." : "今日の課題は何ですか？"}
        disabled={disabled}
        className="flex-1 bg-gray-100 border-gray-200 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={disabled || !question.trim()}
        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
        aria-label="Send question"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default QuestionInput;