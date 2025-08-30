import { useState } from "react";
import { Card } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


const borrowers = [
  {
    id: 1,
    name: "Alice Smith",
    loanType: "Home",
    amount: "$250,000",
    status: "New",
  },
  {
    id: 2,
    name: "Bob Johnson",
    loanType: "Auto",
    amount: "$30,000",
    status: "In Review",
  },
  {
    id: 3,
    name: "Carol Lee",
    loanType: "Personal",
    amount: "$10,000",
    status: "Renew",
  },
];

const PipelineCard = () => {

     const [activeTab, setActiveTab] = useState("New");
     const [activeProfile, setActiveProfile] = useState(borrowers[0]);
     const [radioValue, setRadioValue] = useState("active");

     const filteredBorrowers = borrowers.filter((b) =>
       activeTab === "Approved" ? b.status === "Renew" : b.status === activeTab
     );
  return (
    <Card className="w-full p-2">
      <h2 className="text-xl font-bold">Pipeline</h2>
      <p className="text-sm text-muted-foreground">
        Card description goes here.
      </p>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2">
          <TabsTrigger value="New">New</TabsTrigger>
          <TabsTrigger value="In Review">In Review</TabsTrigger>
          <TabsTrigger value="Approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="space-y-2">
            {filteredBorrowers.map((borrower) => (
              <Card
                key={borrower.id}
                className={` p-2 cursor-pointer ${
                  activeProfile.id === borrower.id
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => setActiveProfile(borrower)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">{borrower.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {borrower.loanType}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold">{borrower.amount}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded bg-primary text-white`}
                    >
                      {borrower.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-4">
        <div className="text-xs font-bold text-muted-foreground mb-2 tracking-widest">
          F-SANATISED ACTIVE
        </div>
        <RadioGroup
          value={radioValue}
          onValueChange={setRadioValue}
          className="flex gap-4"
        >
          <RadioGroupItem value="active" id="active" />
          <label htmlFor="active" className="text-sm">
            Active
          </label>
          <RadioGroupItem value="inactive" id="inactive" />
          <label htmlFor="inactive" className="text-sm">
            Inactive
          </label>
        </RadioGroup>
      </div>
    </Card>
  );
};

export default PipelineCard;
