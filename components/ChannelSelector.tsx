import React from 'react';
import type { Channel } from '../types';

interface ChannelSelectorProps {
  channels: Channel[];
  selectedChannelId: string;
  onChannelChange: (channelId: string) => void;
}

const ChannelSelector: React.FC<ChannelSelectorProps> = ({ channels, selectedChannelId, onChannelChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        チャンネル
      </h2>
      <nav className="mt-4">
        <ul className="space-y-1">
          {channels.map((channel) => (
            <li key={channel.id}>
              <button
                onClick={() => onChannelChange(channel.id)}
                className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedChannelId === channel.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ChannelSelector;