import { initializeApp, getApps } from 'firebase/app';
import { Messaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && 'Notification' in window) {
    // Import messaging dynamically only on client
    import('firebase/messaging').then(({ getMessaging }) => {
        messaging = getMessaging(app);
    });
}

export { messaging };
