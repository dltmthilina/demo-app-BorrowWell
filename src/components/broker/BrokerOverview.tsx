import { Phone, Mail, MessageCircle, CheckCircle, Circle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useIsMobile } from "@/hooks/use-isMobile";
import workflow from "@/mock-data/work_flow.json";
import useApi from "@/hooks/use-api";
import { useEffect, useState } from "react";
import type { WorkflowResponse } from "@/types/types";

const completedSteps = 4;

export default function BrokerOverview() {
  const isMobile = useIsMobile();
  const [workflowSteps, setWorkflowSteps] = useState(workflow.steps);
  const [brokerData, setBrokerData] = useState(null);

  const api = useApi();

  useEffect(() => {
    getWorkflow();
  }, []);

  const getWorkflow = async () => {
    const res = await api.get<WorkflowResponse>("/api/onboarding/workflow");
    if (res) {
      setWorkflowSteps(res.steps);
    }
  };

  const getBroker = async (id: string) => {
    const res: any = await api.get(`/api/broker/${id}`);
    if (res) {
      setBrokerData(res);
    }
  };

  return (
    <Card className="w-full px-4">
      <div className="text-xl font-semibold">Broker Overview</div>
      {isMobile ? (
        <Accordion type="multiple" defaultValue={["broker", "workflow"]}>
          <AccordionItem value="broker">
            <AccordionTrigger>Broker Info</AccordionTrigger>
            <AccordionContent>
              <div>
                <div className="text-md font-semibold">Robert Turner</div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold">16</span>
                    <span className="text-xs text-muted-foreground">Deals</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold">75%</span>
                    <span className="text-xs text-muted-foreground">
                      Approval Rate
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold">$7,660</span>
                    <span className="text-xs text-muted-foreground">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2 justify-center">
                <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                  <Phone className="w-5 h-5 text-black" />
                </Button>
                <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                  <Mail className="w-5 h-5 text-black" />
                </Button>
                <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                  <MessageCircle className="w-5 h-5 text-black" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="workflow">
            <AccordionTrigger>Onboarding Workflow</AccordionTrigger>
            <AccordionContent>
              <div>
                <div className="font-semibold mb-2">Onboarding Workflow</div>
                <ol className="border-l-2 border-black pl-6">
                  {workflowSteps.map((step, idx) => (
                    <li
                      key={step}
                      className="mb-2 last:mb-0 flex items-center gap-2"
                    >
                      <span>
                        {idx < completedSteps ? (
                          <CheckCircle className="w-5 h-5 text-black" />
                        ) : (
                          <Circle className="w-5 h-5 text-black" />
                        )}
                      </span>
                      <span
                        className={
                          idx < completedSteps ? "text-black" : "text-primary"
                        }
                      >
                        {`${idx + 1}. ${step}`}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <div>
            <div className="text-lg font-semibold">Robert Turner</div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">16</span>
                <span className="text-xs text-muted-foreground">Deals</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">75%</span>
                <span className="text-xs text-muted-foreground">
                  Approval Rate
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">$7,660</span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                <Phone className="w-5 h-5 text-black" />
              </Button>
              <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                <Mail className="w-5 h-5 text-black" />
              </Button>
              <Button className="p-2 rounded-full bg-primary hover:opacity-80">
                <MessageCircle className="w-5 h-5 text-black" />
              </Button>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Onboarding Workflow</div>
            <ol className="border-l-2 border-black pl-6">
              {workflowSteps.map((step, idx) => (
                <li
                  key={step}
                  className="mb-2 last:mb-0 flex items-center gap-2"
                >
                  <span>
                    {idx < completedSteps ? (
                      <CheckCircle className="w-5 h-5 text-black" />
                    ) : (
                      <Circle className="w-5 h-5 text-black" />
                    )}
                  </span>
                  <span
                    className={
                      idx < completedSteps ? "text-black" : "text-primary"
                    }
                  >
                    {`${idx + 1}. ${step}`}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
      <div className="flex items-center justify-between mt-2 border-2  p-4 rounded-xl bg-muted ">
        <span className="text-sm font-medium">Enable AI Assistant</span>
        <Switch />
      </div>
    </Card>
  );
}
