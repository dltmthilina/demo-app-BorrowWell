import { AlertCircle, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import Borrowers from "../../mock-data/borrowers.json";
import type { BorrowerDetail } from "@/types/types";

const BorrowerDetailCard = () => {
  const [activeProfile, setActiveProfile] = useState<BorrowerDetail>();
  const ctx = useContext(AppContext);

  useEffect(() => {
    const borrower = Borrowers.borrowers.find(
      (b) => b.id === ctx?.activeProfileId
    );
    if (borrower) {
      setActiveProfile(borrower);
    }
  }, [ctx?.activeProfileId]);

  function statusColor(status: string) {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "In Review":
        return "bg-yellow-500";
      case "Renew":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  }

  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xl font-bold">{activeProfile?.name}</div>
          <div className="text-sm text-muted-foreground">
            {activeProfile?.email} &bull; {activeProfile?.phone}
          </div>
          <div className="font-bold mt-1">{activeProfile?.loan_amount}</div>
        </div>
        {activeProfile?.status && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor(
              activeProfile?.status
            )}`}
          >
            {activeProfile?.status}
          </span>
        )}
      </div>

      {/* AI Explainability Section */}
      <Accordion type="single" collapsible>
        <AccordionItem value="ai-explain">
          <AccordionTrigger className="font-semibold">
            AI Explainability
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 mb-4">
              {activeProfile?.ai_flags.length === 0 ? (
                <div className="text-green-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> No issues detected.
                </div>
              ) : (
                activeProfile?.ai_flags.map((issue) => (
                  <div
                    key={issue}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" /> {issue}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">Request Documents</Button>
              <Button variant="secondary">Send to Valuer</Button>
              <Button variant="secondary">Approve</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Loan Summary */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-xs text-muted-foreground">Employment</div>
          <div className="font-medium">{activeProfile?.employment}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Existing Loan</div>
          <div className="font-medium">{activeProfile?.existing_loan}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Credit Score</div>
          <div className="font-medium">{activeProfile?.credit_score}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Source of Funds</div>
          <div className="font-medium">{activeProfile?.source_of_funds}</div>
        </div>
      </div>

      {/* Risk Signal */}
      {activeProfile?.risk_signal && (
        <div className="flex items-center gap-2 bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded mt-4">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            {activeProfile.risk_signal}
          </span>
        </div>
      )}

      {/* Escalate Button */}
      <Button variant="secondary" className="mt-4 w-full font-bold">
        Escalate to Credit Committee
      </Button>
    </Card>
  );
};

export default BorrowerDetailCard;
