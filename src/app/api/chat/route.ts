import OpenAI from 'openai';
import { NextResponse } from 'next/server';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Add specific instructions to prevent defaulting to Maslow-related responses
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant. Follow these guidelines strictly:
        1. If you don't know something specific, simply say "I don't have information about that" instead of defaulting to Maslow-related responses
        2. Keep responses concise and focused on the specific question
        3. Allow for interruptions by checking for stop signals
        4. Never make assumptions or provide incorrect information
        5. If a topic is outside your knowledge, acknowledge it directly
        6. Avoid mentioning Maslow unless specifically asked about the company`
    };

    // Add the system message at the beginning of the conversation
    const messages = [systemMessage, ...body.messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150, // Reduced for more concise responses
      presence_penalty: 0.6, // Discourage repetitive responses
      frequency_penalty: 0.6, // Encourage diverse responses
      stop: ["STOP", "INTERRUPT"], // Add stop sequences for interruption
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return NextResponse.json({
      message: completion.choices[0].message.content
    });

  } catch (error: any) {
    console.error('API Route Error:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack
    });

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: 'Authentication error. Please check API configuration.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
