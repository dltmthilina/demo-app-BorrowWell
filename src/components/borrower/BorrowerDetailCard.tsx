import { AlertCircle, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import Borrowers from "../../mock-data/borrowers.json";
import type { BorrowerDetail } from "@/types/types";
import { formatCurrency } from "@/utils/utils";
import { Badge } from "../ui/badge";

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
        return "text-muted-foreground";
      case "In Review":
        return "text-black";
      case "Renew":
        return "text-muted-foreground";
      case "Approved":
        return "text-primary";
      default:
        return "text-gray-400";
    }
  }

  return (
    <Card className="w-full px-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xl font-semibold">{activeProfile?.name}</div>
          <div className="text-sm text-muted-foreground">
            {activeProfile?.email} &bull; {activeProfile?.phone}
          </div>
          <div className="font-bold mt-1 text-black">
            {formatCurrency(activeProfile?.loan_amount ?? 0)}
          </div>
        </div>
        {activeProfile?.status && (
          <Badge
            variant="secondary"
            className={`px-3 py-1   text-xs font-bold bg-muted ${statusColor(
              activeProfile?.status
            )}`}
          >
            {activeProfile?.status}
          </Badge>
        )}
      </div>

      {/* AI Explainability Section */}
      <Accordion
        type="single"
        collapsible
        className=" bg-muted border-2 p-4 rounded-xl"
      >
        <AccordionItem value="ai-explain">
          <AccordionTrigger className="font-semibold">
            AI Explainability
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 mb-4 w-full">
              {activeProfile?.ai_flags.length === 0 ? (
                <div className="text-black flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> No issues detected.
                </div>
              ) : (
                activeProfile?.ai_flags.map((issue) => (
                  <div key={issue} className=" flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> {issue}
                  </div>
                ))
              )}
            </div>
            <div className="flex w-full justify-start gap-2">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary hover:opacity-80 cursor-pointer"
                variant="secondary"
              >
                Request Documents
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary hover:opacity-80 cursor-pointer"
                variant="secondary"
              >
                Send to Valuer
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary hover:opacity-80 cursor-pointer"
                variant="secondary"
              >
                Approve
              </Button>
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
          <div className="font-medium">
            {formatCurrency(activeProfile?.existing_loan ?? 0)}
          </div>
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
        <div className="flex items-center gap-2   p-2 rounded mt-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-black">
            {activeProfile.risk_signal}
          </span>
        </div>
      )}

      {/* Escalate Button */}
      <Button
        variant="secondary"
        className=" w-full bg-primary hover:bg-primary hover:opacity-80 mt-4 cursor-pointer"
        disabled={
          !activeProfile?.risk_signal &&
          (!activeProfile?.ai_flags || activeProfile.ai_flags.length === 0)
        }
      >
        Escalate to Credit Committee
      </Button>
    </Card>
  );
};

export default BorrowerDetailCard;
