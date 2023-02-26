export function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      localStorage.setItem("notifications", "granted");
    } else if (permission === "denied") {
      localStorage.setItem("notifications", "denied");
    } else {
      return;
    }
  });
}

export function sendNotification({ title, body }: { title: string; body: string }) {
  new Notification(title, { body });
}

