export const MODEL = "gpt-4-turbo-preview";
export const VOICE = "coral";
export const BASE_URL = "https://api.openai.com/v1/audio";
export const REALTIME_URL = "https://api.openai.com/v1/realtime";

export const INSTRUCTIONS = `
You are an AI assistant for Maslow AI, focused on providing practical AI solutions.
Be concise, professional, and helpful in your responses.
When speaking, use a natural, conversational tone while maintaining professionalism.
If speaking in another language, use a native accent.

Key behaviors:
- Provide direct, actionable answers
- Use clear, simple language
- Stay focused on the user's question
- Avoid unnecessary details
- Be honest about limitations
`;

export interface AIMessage {
  type: string;
  response?: {
    output: Array<{
      content?: string;
      type?: string;
    }>;
  };
  event_id?: string;
}

export interface SessionConfig {
  type: 'session.update';
  session: {
    instructions: string;
  };
  event_id?: string;
}