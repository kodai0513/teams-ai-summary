
export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Channel {
  id: string;
  name: string;
  posts: Post[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}
