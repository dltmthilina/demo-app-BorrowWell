import { createContext, useState } from "react";

type PipelineContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProfileId: string;
  setActiveProfileId: (id: string) => void;
};

export const BorrowerContext = createContext<PipelineContextType | undefined>(undefined);

export function BorrowerProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("New");
  const [activeProfileId, setActiveProfileId] = useState<string>("");

  return (
    <BorrowerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeProfileId,
        setActiveProfileId,
      }}
    >
      {children}
    </BorrowerContext.Provider>
  );
}


