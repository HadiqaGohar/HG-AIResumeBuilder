// // import { NextRequest, NextResponse } from 'next/server';
// // import fs from 'fs';
// // import path from 'path';

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { email, type, timestamp } = await request.json();

// //     // Validate email
// //     if (!email || !email.includes('@')) {
// //       return NextResponse.json(
// //         { error: 'Invalid email address' },
// //         { status: 400 }
// //       );
// //     }

// //     // Create data directory if it doesn't exist
// //     const dataDir = path.join(process.cwd(), 'data');
// //     if (!fs.existsSync(dataDir)) {
// //       fs.mkdirSync(dataDir, { recursive: true });
// //     }

// //     // Read existing notifications
// //     const filePath = path.join(dataDir, 'notifications.json');
// //     let notifications = [];

// //     try {
// //       if (fs.existsSync(filePath)) {
// //         const fileData = fs.readFileSync(filePath, 'utf8');
// //         notifications = JSON.parse(fileData);
// //       }
// //     } catch {
// //       console.log('Creating new notifications file');
// //       notifications = [];
// //     }

// //     // Check if email already exists
// //     const existingEmail = notifications.find((n) => n.email === email && n.type === type);
    
// //     if (existingEmail) {
// //       return NextResponse.json(
// //         { message: 'Email already subscribed!' },
// //         { status: 200 }
// //       );
// //     }

// //     // Add new notification
// //     const newNotification = {
// //       id: Date.now().toString(),
// //       email,
// //       type,
// //       timestamp,
// //       subscribed: true
// //     };

// //     notifications.push(newNotification);

// //     // Save to file
// //     fs.writeFileSync(filePath, JSON.stringify(notifications, null, 2));

// //     console.log(`New email subscription: ${email} for ${type}`);

// //     return NextResponse.json(
// //       { message: 'Successfully subscribed to notifications!' },
// //       { status: 200 }
// //     );

// //   } catch (error) {
// //     console.error('Error saving notification:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function GET() {
// //   try {
// //     const filePath = path.join(process.cwd(), 'data', 'notifications.json');
    
// //     if (!fs.existsSync(filePath)) {
// //       return NextResponse.json({ notifications: [] });
// //     }

// //     const fileData = fs.readFileSync(filePath, 'utf8');
// //     const notifications = JSON.parse(fileData);

// //     // Return count and basic info (without exposing emails)
// //     return NextResponse.json({
// //       count: notifications.length,
// //       types: [...new Set(notifications.map((n) => n.type))]
// //     });

// //   } catch (error) {
// //     console.error('Error reading notifications:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }




// import { NextRequest, NextResponse } from 'next/server';
// // import clientPromise from '@/lib/mongodb';
// import clientPromise from '../../../../lib/mongodb';


// export async function POST(request: NextRequest) {
//   try {
//     const { email, type, timestamp } = await request.json();

//     // Validate email
//     if (!email || !email.includes('@')) {
//       return NextResponse.json(
//         { error: 'Invalid email address' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB);
//     const collection = db.collection('notifications');

//     // Check if email already exists
//     const existingNotification = await collection.findOne({ 
//       email, 
//       type 
//     });
    
//     if (existingNotification) {
//       return NextResponse.json(
//         { message: 'Email already subscribed!' },
//         { status: 200 }
//       );
//     }

//     // Add new notification
//     const newNotification = {
//       email,
//       type,
//       timestamp: timestamp || new Date(),
//       subscribed: true
//     };

//     await collection.insertOne(newNotification);

//     console.log(`New email subscription: ${email} for ${type}`);

//     return NextResponse.json(
//       { message: 'Successfully subscribed to notifications!' },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error saving notification:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB);
//     const collection = db.collection('notifications');
    
//     const notifications = await collection.find({}).toArray();

//     // Return count and basic info (without exposing emails)
//     return NextResponse.json({
//       count: notifications.length,
//       types: [...new Set(notifications.map((n) => n.type))],
//       stats: {
//         newsletter: notifications.filter((n) => n.type === 'newsletter').length,
//         template_updates: notifications.filter((n) => n.type === 'template_updates').length
//       }
//     });

//   } catch (error) {
//     console.error('Error reading notifications:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Get all notifications
    const notifications = await db.collection('notifications').find({}).toArray();
    
    // Get newsletter subscribers
    const newsletterSubscribers = await db.collection('subscribers').find({}).toArray();
    
    // Combine both collections
    const allSubscribers = [
      ...notifications.map(n => ({ 
        _id: n._id.toString(), 
        email: n.email, 
        type: n.type, 
        timestamp: n.timestamp,
        subscribed: n.subscribed 
      })),
      ...newsletterSubscribers.map(s => ({ 
        _id: s._id.toString(), 
        email: s.email, 
        type: s.type || 'newsletter', 
        timestamp: s.subscribedAt,
        subscribed: s.subscribed 
      }))
    ];

    // Calculate stats
    const newsletterCount = allSubscribers.filter(s => s.type === 'newsletter').length;
    const templateUpdatesCount = allSubscribers.filter(s => s.type === 'template_updates').length;
    
    return NextResponse.json({
      count: allSubscribers.length,
      notifications: allSubscribers,
      types: [...new Set(allSubscribers.map(n => n.type))],
      stats: {
        newsletter: newsletterCount,
        template_updates: templateUpdatesCount
      }
    });

  } catch (error) {
    console.error('Error reading notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
