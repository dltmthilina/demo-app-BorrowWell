"use client";

import type { NotificationType } from "@/types/types";
import { AlertCircle, CheckCircle } from "lucide-react";
import { createContext } from "react";
import { Toaster, toast } from "sonner";


interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

NotificationContext.displayName = "NotificationContext";

export function NotificationProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const showNotification = (type: NotificationType, message: string) => {
    if (type === "success") {
      toast.success("Success", {
        description: message,
        duration: 4000,
        icon: <CheckCircle className="text-primary w-4" />,
      });
    } else if (type === "error") {
      toast.error("Error", {
        description: message,
        duration: 7000,
        icon: <AlertCircle className="text-primary w-4" />,
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Toaster position="top-right" richColors={false} />
    </NotificationContext.Provider>
  );
}
