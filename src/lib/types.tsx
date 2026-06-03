export type MessageRole = "user" | "assistant";

export interface Attachment {
  name: string;
  size: string;
  url?: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  attachment?: Attachment;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  category:
    | "budget"
    | "savings"
    | "spending"
    | "goals"
    | "debt"
    | "general";

  messages?: Message[];
}

export interface ChatResponse {
  message: Message;
  conversationId: string;
}