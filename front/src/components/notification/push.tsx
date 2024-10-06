// push.tsx
import {
  sendNotification,
} from "@/lib/actions";
import { usePushNotification } from "@/contexts/notificationContext";
import { Button } from "@/components/ui/button";

export function PushTestNotiButton() {
  const { subscription } = usePushNotification();

  async function sendTestNotification() {
    console.log(subscription);

    if (subscription) {
      await sendNotification("This is a test notification");
    } else {
      alert("You are not subscribed to push notifications.");
    }
  }
  return (
    <Button variant="secondary" onClick={sendTestNotification}>
      通知テスト
    </Button>
  );
}
