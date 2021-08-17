export interface ConversationInterface {
  id: string;
  title: string;
  members: string[];
  created: Date;
  picture: string | null;
}

export interface MessageInterface {
  id: string;
  sender: string;
  message: string;
  created: Date;
}
