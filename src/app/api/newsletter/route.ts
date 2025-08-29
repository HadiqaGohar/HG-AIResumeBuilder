import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define a type for newsletter subscribers
interface Subscriber {
  id: string;
  email: string;
  type: string;
  subscribedAt: string;
  subscribed: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing newsletter subscribers
    const filePath = path.join(dataDir, 'newsletter.json');
    let subscribers: Subscriber[] = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        subscribers = JSON.parse(fileData);
      }
    } catch {
      console.log('Creating new newsletter file');
      subscribers = [];
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub: Subscriber) => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Add new subscriber
    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email,
      type: 'newsletter',
      subscribedAt: new Date().toISOString(),
      subscribed: true
    };

    subscribers.push(newSubscriber);

    // Save to file
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    console.log(`New newsletter subscription: ${email}`);

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'newsletter.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        subscribers: 0,
        data: []
      });
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const subscribers: Subscriber[] = JSON.parse(fileData);

    return NextResponse.json({
      subscribers: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

