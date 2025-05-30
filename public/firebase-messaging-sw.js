importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

const fireBaseConfig = {
    apiKey: 'AIzaSyDpD74GwqgIEmgFLZpSfQmpNOG9Gid5amc',
    authDomain: 'moolian.firebaseapp.com',
    projectId: 'moolian',
    messagingSenderId: '257572373556',
    appId: "1:257572373556:web:15030636b63152e6d53661"
}

firebase.initializeApp(fireBaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/img/logo.svg',
        data: { url: payload.fcmOptions?.link || "/" },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/";

    event.waitUntil(
        clients
            .matchAll({
                type: "window",
                includeUncontrolled: true,
            })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes(targetUrl) && "focus" in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow(targetUrl);
            })
    );
});