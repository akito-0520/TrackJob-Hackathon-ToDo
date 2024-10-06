import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface NotificationSettings {
  enabled: boolean;
  items: NotificationItem[];
}

export interface NotificationItem {
  id: number;
  time: string;
  days: string[];
  repeat: string;
}

interface PushNotificationContextProps {
  subscription: PushSubscription | null;
  setSubscription: Dispatch<SetStateAction<PushSubscription | null>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  notificationSettings: NotificationSettings;
  setNotificationSettings: Dispatch<SetStateAction<NotificationSettings>>;
  isSupported: boolean;
  setIsSupported: Dispatch<SetStateAction<boolean>>;
}

const PushNotificationContext = createContext<
  PushNotificationContextProps | undefined
>(undefined);

export const PushNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [isSupported, setIsSupported] = useState(false);
  const [message, setMessage] = useState("");

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      enabled: subscription !== null,
      items: [],
    });

  // subscriptionの変更を監視してnotificationSettings.enabledを更新
  useEffect(() => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      enabled: subscription !== null,
    }));
  }, [subscription]);
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  return (
    <PushNotificationContext.Provider
      value={{
        subscription,
        setSubscription,
        message,
        setMessage,
        notificationSettings,
        setNotificationSettings,
        isSupported,
        setIsSupported,
      }}
    >
      {children}
    </PushNotificationContext.Provider>
  );
};

export const usePushNotification = () => {
  const context = useContext(PushNotificationContext);
  if (!context) {
    throw new Error(
      "usePushNotification must be used within a PushNotificationProvider"
    );
  }
  return context;
};
