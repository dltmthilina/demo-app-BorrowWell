import { Phone, Mail, MessageCircle, CheckCircle, Circle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

const steps = [
  "Profile Created",
  "Documents Uploaded",
  "Initial Review",
  "Valuation Scheduled",
  "Compliance Check",
  "Final Approval",
  "Deal Closed",
];

const completedSteps = 4;

export default function BrokerOverview() {
  return (
    <Card className="w-full px-4">
      {/* Broker Info */}
      <div>
        <div className="text-xl font-semibold">Robert Turner</div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">16</span>
            <span className="text-xs text-muted-foreground">Deals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">75%</span>
            <span className="text-xs text-muted-foreground">Approval Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">$7,660</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-2 justify-center">
        <Button className="p-2 rounded-full bg-muted">
          <Phone className="w-5 h-5 text-black" />
        </Button>
        <Button className="p-2 rounded-full bg-muted">
          <Mail className="w-5 h-5 text-black" />
        </Button>
        <Button className="p-2 rounded-full bg-muted">
          <MessageCircle className="w-5 h-5 text-black" />
        </Button>
      </div>

      {/* Onboarding Workflow */}
      <div>
        <div className="font-semibold mb-2">Onboarding Workflow</div>
        <ol className="border-l-2 border-primary pl-6">
          {steps.map((step, idx) => (
            <li key={step} className="mb-2 last:mb-0 flex items-center gap-2">
              <span>
                {idx < completedSteps ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </span>
              <span
                className={
                  idx < completedSteps
                    ? "text-primary font-medium"
                    : "text-gray-500"
                }
              >
                {`${idx + 1}. ${step}`}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center justify-between mt-2 border-2  p-4 rounded-xl bg-muted ">
        <span className="text-sm font-medium">Enable AI Assistant</span>
        <Switch />
      </div>
    </Card>
  );
}
