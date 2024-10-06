"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Plus, X } from "lucide-react";

interface NotificationSettings {
  enabled: boolean;
  items: NotificationItem[];
}

interface NotificationItem {
  id: number;
  time: string;
  days: string[];
  repeat: string;
}

// 通知時間の設定などの設定画面
export default function SettingsButtonWithDialog() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      enabled: false,
      items: [],
    });

  function updateNotificationSettings(updates: Partial<NotificationSettings>) {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      ...updates,
    }));
  }

  const addNotificationItem = () => {
    const newItem: NotificationItem = {
      id: Date.now(),
      time: "09:00",
      days: ["月", "水", "金"],
      repeat: "毎日",
    };
    updateNotificationSettings({
      items: [...notificationSettings.items, newItem],
    });
  };

  const updateNotificationItem = (
    id: number,
    updates: Partial<NotificationItem>
  ) => {
    const updatedItems = notificationSettings.items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    updateNotificationSettings({ items: updatedItems });
  };

  const deleteNotificationItem = (id: number) => {
    const updatedItems = notificationSettings.items.filter(
      (item) => item.id !== id
    );
    updateNotificationSettings({ items: updatedItems });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">設定</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>通知設定</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-right">
              プッシュ通知
            </Label>
            <Switch
              id="notifications"
              checked={notificationSettings.enabled}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ enabled: checked })
              }
            />
          </div>
          {notificationSettings.items.map((item, index) => (
            <div key={item.id} className="border p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => deleteNotificationItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold mb-2">通知 {index + 1}</h3>
              <div className="grid gap-2">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor={`time-${item.id}`} className="text-right">
                    時刻
                  </Label>
                  <Input
                    id={`time-${item.id}`}
                    type="time"
                    value={item.time}
                    onChange={(e) =>
                      updateNotificationItem(item.id, { time: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right">曜日</Label>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                      <Button
                        key={day}
                        variant={
                          item.days.includes(day) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newDays = item.days.includes(day)
                            ? item.days.filter((d) => d !== day)
                            : [...item.days, day];
                          updateNotificationItem(item.id, { days: newDays });
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor={`repeat-${item.id}`} className="text-right">
                    繰り返し
                  </Label>
                  <Select
                    value={item.repeat}
                    onValueChange={(value) =>
                      updateNotificationItem(item.id, { repeat: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="繰り返し頻度を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="毎日">毎日</SelectItem>
                      <SelectItem value="平日のみ">平日のみ</SelectItem>
                      <SelectItem value="週1回">週1回</SelectItem>
                      <SelectItem value="月1回">月1回</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addNotificationItem} className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            通知を追加
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
