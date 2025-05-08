import { NextResponse } from 'next/server';

const DEFAULT_INSTRUCTIONS = `You are a helpful AI assistant for Maslow AI company. You can provide information about:
- Company details and services
- Team members and their expertise
- AI solutions and implementations
- Contact information

Keep responses professional and focused on business inquiries.`;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        instructions: DEFAULT_INSTRUCTIONS,
        voice: "alloy",
      }),
    });

    const result = await response.json();
    return NextResponse.json({ result });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}