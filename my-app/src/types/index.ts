// types/index.ts

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
};
  
  export type Message = {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
  };
  
  export type ChatSession = {
    id: number;
    name: string;
    messages: Message[];
  };
  
  export type TableDataItem = User | ChatSession;
  