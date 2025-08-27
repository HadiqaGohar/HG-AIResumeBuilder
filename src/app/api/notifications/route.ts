import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email, type, timestamp } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing notifications
    const filePath = path.join(dataDir, 'notifications.json');
    let notifications = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        notifications = JSON.parse(fileData);
      }
    } catch {
      console.log('Creating new notifications file');
      notifications = [];
    }

    // Check if email already exists
    const existingEmail = notifications.find((n) => n.email === email && n.type === type);
    
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already subscribed!' },
        { status: 200 }
      );
    }

    // Add new notification
    const newNotification = {
      id: Date.now().toString(),
      email,
      type,
      timestamp,
      subscribed: true
    };

    notifications.push(newNotification);

    // Save to file
    fs.writeFileSync(filePath, JSON.stringify(notifications, null, 2));

    console.log(`New email subscription: ${email} for ${type}`);

    return NextResponse.json(
      { message: 'Successfully subscribed to notifications!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error saving notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'notifications.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ notifications: [] });
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const notifications = JSON.parse(fileData);

    // Return count and basic info (without exposing emails)
    return NextResponse.json({
      count: notifications.length,
      types: [...new Set(notifications.map((n) => n.type))]
    });

  } catch (error) {
    console.error('Error reading notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}