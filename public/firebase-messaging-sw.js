self.addEventListener('push', function (event) {
    let notification = event.data.json().notification;
    let title = notification.title;
    let body = notification.body;
    let image = notification.image;
    console.log(event, notification)
    event.waitUntil(
        self.registration.showNotification(title, { ...notification.options, body, image })
    );
});