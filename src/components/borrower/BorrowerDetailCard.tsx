import { AlertCircle, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { BorrowerContext } from "@/context/BorrowerContext";
import Borrowers from "../../mock-data/borrowers.json";
import type { BorrowerDetail } from "@/types/types";
import { formatCurrency } from "@/utils/utils";
import { Badge } from "../ui/badge";
import useApi from "@/hooks/use-api";
import { on } from "events";

const BorrowerDetailCard = () => {
  const [activeProfile, setActiveProfile] = useState<BorrowerDetail | null>(
    null
  );
  const ctx = useContext(BorrowerContext);
  const api = useApi();

  useEffect(() => {
    if (ctx?.activeProfileId) {
      //fetchBorrower();
      const borrower = Borrowers.borrowers.find(
        (b) => b.id === ctx.activeProfileId
      );
      if (borrower) {
        console.log(borrower);
        setActiveProfile(borrower);
      }
    } else {
      setActiveProfile(null);
    }
  }, [ctx?.activeProfileId]);

  useEffect(() => {
    console.log(activeProfile);
  }, [activeProfile]);

  const fetchBorrower = async () => {
    const response = await api.get<BorrowerDetail>(
      `/api/borrowers/${ctx?.activeProfileId}`
    );
    if (response) {
      setActiveProfile(response);
    }
  };

  const requestDocuments = async () => {
    await api.post(`/api/borrowers/${ctx?.activeProfileId}/request-documents`, {
      onSuccessMessage: "Documents requested successfully",
      onErrorMessage: "Failed to request documents",
    });
  };

  const sendToValuer = async () => {
    await api.post(`/api/borrowers/${ctx?.activeProfileId}/send-valuer`, {
      onSuccessMessage: "Sent to valuer successfully",
      onErrorMessage: "Failed to send to valuer",
    });
  };

  const approveLoan = async () => {
    await api.post(`/api/borrowers/${ctx?.activeProfileId}/approve`, {
      onSuccessMessage: "Loan approved successfully",
      onErrorMessage: "Failed to approve loan",
    });
  };

  const escalate = async () => {
    await api.post(`/api/borrowers/${ctx?.activeProfileId}/escalate`, {
      onSuccessMessage: "Escalated successfully",
      onErrorMessage: "Failed to escalate",
    });
  };

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
      <div className="text-xl font-semibold">Borrower Details</div>

      {!activeProfile ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <AlertCircle className="w-4 h-4 mb-2 text-primary" />
          <span className="text-sm text-black">
            Please select a borrower from the left pane.
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div
                data-testid="borrower-detail-name"
                className="text-lg font-semibold"
              >
                {activeProfile?.name}
              </div>
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
            data-testid="ai-explain-accordion"
            type="single"
            collapsible
            className=" bg-muted border-2 p-4 rounded-xl"
          >
            <AccordionItem data-testid="ai-explain-item" value="ai-explain">
              <AccordionTrigger
                data-testid="ai-explain-trigger"
                className="font-semibold"
              >
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
                        <AlertTriangle className="w-4 h-4 text-red-500" />{" "}
                        {issue}
                      </div>
                    ))
                  )}
                </div>
                <div className="flex flex-col xl:flex-row w-full justify-start gap-2">
                  <Button
                    data-testid="request-documents-btn"
                    onClick={() => {
                      console.log("Request Documents clicked");
                      requestDocuments();
                    }}
                    size="sm"
                    className="bg-primary hover:bg-primary hover:opacity-80 cursor-pointer"
                    variant="secondary"
                  >
                    Request Documents
                  </Button>
                  <Button
                    data-testid="send-valuer-btn"
                    onClick={() => {
                      console.log("Send to Valuer clicked");
                      sendToValuer();
                    }}
                    size="sm"
                    className="bg-primary hover:bg-primary hover:opacity-80 cursor-pointer"
                    variant="secondary"
                  >
                    Send to Valuer
                  </Button>
                  <Button
                    data-testid="approve-btn"
                    onClick={() => {
                      console.log("Approve clicked");
                      approveLoan();
                    }}
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
              <div className="text-xs text-muted-foreground">
                Source of Funds
              </div>
              <div className="font-medium">
                {activeProfile?.source_of_funds}
              </div>
            </div>
          </div>

          {/* Risk Signal */}
          {activeProfile?.risk_signal && (
            <div className="flex items-center gap-2 rounded mt-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-black">
                {activeProfile.risk_signal}
              </span>
            </div>
          )}

          {/* Escalate Button */}
          <Button
            data-testid="escalate-btn"
            onClick={() => {
              console.log("Escalate to Credit Committee clicked");
              escalate();
            }}
            variant="secondary"
            className=" w-full bg-primary hover:bg-primary hover:opacity-80 mt-4 cursor-pointer"
            disabled={
              !activeProfile?.risk_signal &&
              (!activeProfile?.ai_flags || activeProfile.ai_flags.length === 0)
            }
          >
            Escalate to Credit Committee
          </Button>
        </>
      )}
    </Card>
  );
};

export default BorrowerDetailCard;
