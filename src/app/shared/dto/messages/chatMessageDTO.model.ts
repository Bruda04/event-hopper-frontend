export interface ChatMessageDTO {
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  sentByMe: boolean;
}
