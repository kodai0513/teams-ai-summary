import React from 'react';

const GeminiIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.5a1.5 1.5 0 0 1 .88 2.84l5.12 3.66a1.5 1.5 0 0 1 0 2l-5.12 3.66a1.5 1.5 0 0 1-1.76 0L6.88 11a1.5 1.5 0 0 1 0-2l5.12-3.66A1.5 1.5 0 0 1 12 2.5Zm0 13a1.5 1.5 0 0 1 .88 2.84l5.12 3.66a1.5 1.5 0 0 1 0 2L12.88 24a1.5 1.5 0 0 1-1.76 0l-5.12-3.66a1.5 1.5 0 0 1 0-2l5.12-3.66A1.5 1.5 0 0 1 12 15.5Z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
           <GeminiIcon className="h-6 w-6 text-blue-600"/>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">AI Channel Assistant</h1>
      </div>
    </header>
  );
};

export default Header;