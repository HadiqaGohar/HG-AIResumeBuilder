// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// // Define a type for notification and newsletter subscribers
// interface Subscriber {
//   type: string;
//   timestamp?: string;
//   subscribedAt?: string;
//   [key: string]: unknown; // Allow additional fields for flexibility
// }

// export async function GET() {
//   try {
//     const dataDir = path.join(process.cwd(), 'data');
//     const notificationsPath = path.join(dataDir, 'notifications.json');
//     const newsletterPath = path.join(dataDir, 'newsletter.json');
    
//     const allSubscribers: Subscriber[] = [];
    
//     // Read template notifications
//     if (fs.existsSync(notificationsPath)) {
//       try {
//         const notificationsData = fs.readFileSync(notificationsPath, 'utf8');
//         const notifications: Subscriber[] = JSON.parse(notificationsData);
//         allSubscribers.push(...notifications);
//       } catch {
//         console.log('Error reading notifications file');
//       }
//     }
    
//     // Read newsletter subscribers
//     if (fs.existsSync(newsletterPath)) {
//       try {
//         const newsletterData = fs.readFileSync(newsletterPath, 'utf8');
//         const newsletter: Subscriber[] = JSON.parse(newsletterData);
//         allSubscribers.push(...newsletter);
//       } catch {
//         console.log('Error reading newsletter file');
//       }
//     }

//     // Sort by timestamp (newest first)
//     allSubscribers.sort((a: Subscriber, b: Subscriber) => {
//       const timeA = new Date(a.timestamp || a.subscribedAt || 0).getTime();
//       const timeB = new Date(b.timestamp || b.subscribedAt || 0).getTime();
//       return timeB - timeA;
//     });

//     // Get unique types
//     const types = [...new Set(allSubscribers.map((n: Subscriber) => n.type))];

//     return NextResponse.json({
//       notifications: allSubscribers,
//       count: allSubscribers.length,
//       types: types,
//       stats: {
//         newsletter: allSubscribers.filter((s: Subscriber) => s.type === 'newsletter').length,
//         template_updates: allSubscribers.filter((s: Subscriber) => s.type === 'template_updates').length
//       }
//     });

//   } catch (error) {
//     console.error('Error reading subscribers:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "../../../../lib/mongodb";
import clientPromise from "../../../../../lib/mongodb";


export async function POST(request: NextRequest) {
  try {
    const { email, type, timestamp } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("notifications");

    const existingNotification = await collection.findOne({ email, type });

    if (existingNotification) {
      return NextResponse.json({ message: "Email already subscribed!" }, { status: 200 });
    }

    const newNotification = {
      email,
      type,
      timestamp: timestamp || new Date(),
      subscribed: true,
    };

    await collection.insertOne(newNotification);

    console.log(`New email subscription: ${email} for ${type}`);

    return NextResponse.json(
      { message: "Successfully subscribed to notifications!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving notification:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const notifications = await db.collection("notifications").find({}).toArray();
    const newsletterSubscribers = await db.collection("subscribers").find({}).toArray();

    const allSubscribers = [
      ...notifications.map((n) => ({
        _id: n._id.toString(),
        email: n.email,
        type: n.type,
        timestamp: n.timestamp,
        subscribed: n.subscribed,
      })),
      ...newsletterSubscribers.map((s) => ({
        _id: s._id.toString(),
        email: s.email,
        type: s.type || "newsletter",
        timestamp: s.subscribedAt,
        subscribed: s.subscribed,
      })),
    ];

    const newsletterCount = allSubscribers.filter((s) => s.type === "newsletter").length;
    const templateUpdatesCount = allSubscribers.filter((s) => s.type === "template_updates").length;

    return NextResponse.json({
      count: allSubscribers.length,
      notifications: allSubscribers,
      types: [...new Set(allSubscribers.map((n) => n.type))],
      stats: {
        newsletter: newsletterCount,
        template_updates: templateUpdatesCount,
      },
    });
  } catch (error) {
    console.error("Error reading notifications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Subscriber ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("notifications");

    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscriber deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
