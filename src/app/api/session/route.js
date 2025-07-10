import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SESSIONS_DIR = path.join(process.cwd(), 'sessions');
const SESSION_EXPIRY_DAYS = 30;

// Ensure sessions directory exists
if (!fs.existsSync(SESSIONS_DIR)) {
    fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

// Check if username is available
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const sessionPath = path.join(SESSIONS_DIR, `${username}.json`);

    switch (action) {
        case 'check':
            return NextResponse.json({ available: !fs.existsSync(sessionPath) });
        
        case 'load':
            if (!fs.existsSync(sessionPath)) {
                return NextResponse.json({ error: 'Session not found' }, { status: 404 });
            }

            const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
            const createdAt = new Date(sessionData.createdAt);
            const now = new Date();
            const daysDiff = (now - createdAt) / (1000 * 60 * 60 * 24);

            if (daysDiff > SESSION_EXPIRY_DAYS) {
                fs.unlinkSync(sessionPath);
                return NextResponse.json({ error: 'Session expired' }, { status: 410 });
            }

            return NextResponse.json(sessionData);

        default:
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
}

// Save or update session
export async function POST(request) {
    try {
        const { username, data } = await request.json();

        if (!username || !data) {
            return NextResponse.json({ error: 'Username and data are required' }, { status: 400 });
        }

        const sessionPath = path.join(SESSIONS_DIR, `${username}.json`);
        
        // If file exists, merge with existing data to preserve structure
        let existingData = {};
        if (fs.existsSync(sessionPath)) {
            try {
                existingData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
            } catch (error) {
                console.error('Error reading existing session:', error);
            }
        }

        // Merge existing data with new data, preserving structure
        const sessionData = {
            ...existingData,
            ...data,
            createdAt: existingData.createdAt || data.createdAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };

        // Ensure flags array is preserved
        if (existingData.flags && data.flags) {
            sessionData.flags = data.flags.map(newFlag => {
                const existingFlag = existingData.flags.find(f => f.id === newFlag.id);
                return existingFlag ? { ...existingFlag, ...newFlag } : newFlag;
            });
        }

        fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));
        return NextResponse.json(sessionData);
    } catch (error) {
        console.error('Error saving session:', error);
        return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
    }
} 