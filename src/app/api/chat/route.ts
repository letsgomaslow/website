import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Validate environment variable
if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Log the incoming request (remove in production)
    console.log('Incoming request:', body.messages);

    // Make request to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: body.messages,
      temperature: 0.7,
      max_tokens: 500
    });

    // Validate OpenAI response
    if (!completion.choices[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    // Return successful response
    return NextResponse.json({
      message: completion.choices[0].message.content
    });

  } catch (error: any) {
    // Log detailed error
    console.error('API Route Error:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack
    });

    // Return appropriate error response
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

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}