import { Phone, Mail, MessageCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

export default function BrokerOverview() {
  return (
    <Card className="p-4 flex flex-col gap-6">
      {/* Broker Info */}
      <div>
        <div className="text-lg font-bold">Robert Turner</div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">16</span>
            <span className="text-xs text-muted-foreground">Deals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">75%</span>
            <span className="text-xs text-muted-foreground">Approval Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">$7,660</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="icon">
          <Phone />
        </Button>
        <Button variant="outline" size="icon">
          <Mail />
        </Button>
        <Button variant="outline" size="icon">
          <MessageCircle />
        </Button>
      </div>

      {/* Onboarding Workflow */}
      <div>
        <div className="font-semibold mb-2">Onboarding Workflow</div>
        <ol className="list-decimal ml-6 space-y-1 text-sm">
          <li>Profile Created</li>
          <li>Documents Uploaded</li>
          <li>Initial Review</li>
          <li>Valuation Scheduled</li>
          <li>Compliance Check</li>
          <li>Final Approval</li>
          <li>Deal Closed</li>
        </ol>
      </div>

      {/* AI Assistant Toggle */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-medium">E Ardsassist</span>
        <Switch />
      </div>
    </Card>
  );
}
