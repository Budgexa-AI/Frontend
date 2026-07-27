self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Rayo", {
      body: data.body ?? "",
      icon: "/logo.svg",     
      badge: "/logo.svg",    
      data: { url: data.url ?? "/product/finance/dashboard" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});