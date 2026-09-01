// lib/push-notification.ts
import { apiFetch } from "./api-client/src";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function enablePushNotifications(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return { success: false, error: "Push notifications aren't supported in this browser." };
    }

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      return { success: false, error: "Push notifications aren't configured (missing VAPID key)." };
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return { success: false, error: "Notification permission was not granted." };
    }

    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    const res = await apiFetch("/notifications/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription.toJSON()),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return { success: false, error: body?.error ?? `Server rejected subscription (${res.status})` };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[enablePushNotifications] failed:", err);
    return { success: false, error: err?.message ?? "Something went wrong enabling push notifications." };
  }
}

export async function disablePushNotifications(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    if (subscription) {
      await apiFetch("/notifications/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      await subscription.unsubscribe();
    }
  } catch (err) {
    console.error("[disablePushNotifications] failed:", err);
  }
}