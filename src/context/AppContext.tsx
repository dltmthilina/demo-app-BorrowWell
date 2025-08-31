import { createContext, useState } from "react";

type PipelineContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProfileId: string;
  setActiveProfileId: (id: string) => void;
};

export const AppContext = createContext<PipelineContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("New");
  const [activeProfileId, setActiveProfileId] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeProfileId,
        setActiveProfileId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


