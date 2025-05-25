'use client';
import { useEffect, useState } from 'react';
import { messaging } from '@/lib/firebaseClient';
import { getToken } from 'firebase/messaging';

export default function PushNotificationManager() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function requestPermissionAndGetToken() {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    return;
                }

                const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                if (!registration) {
                    console.error('Service worker registration failed');
                    return;
                }

                const currentToken = await getToken(messaging!, {
                    vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                    serviceWorkerRegistration: registration,
                });

                if (currentToken) {
                    setToken(currentToken);

                    // Check if token is already saved locally
                    const savedToken = localStorage.getItem('fcmToken');

                    // Only send to backend if token is new or changed
                    if (savedToken !== currentToken) {
                        await fetch(`${process.env.NEXT_PUBLIC_BackEnd_API}/admin`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token: currentToken }),
                        });
                        localStorage.setItem('fcmToken', currentToken);
                    }
                }
            } catch (error) {
                console.error('Error getting FCM token:', error);
            }
        }

        requestPermissionAndGetToken();
    }, []);

    if (token) return null;

    return (
        <div className='my-5 text-center w-full text-destructive'>
            شما نوتیفیکیشن خود را فعال نکرده اید
        </div>
    );
}
