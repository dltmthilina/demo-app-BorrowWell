import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import pipelineMockData from "../../mock-data/pipeline.json";
import useApi from "@/hooks/use-api";
import type { BorrowerPipeline, BorrowerSummary } from "@/types/types";

const tabKeyMap: Record<string, keyof BorrowerPipeline> = {
  New: "new",
  "In Review": "in_review",
  Approved: "approved",
};

const BorrowerPipeline = () => {
  const [activeTab, setActiveTab] = useState<string>("New");
  const [activeProfile, setActiveProfile] = useState<BorrowerSummary>();
  const [radioValue, setRadioValue] = useState("active");
  const [pipelineData, setPipelineData] = useState<BorrowerPipeline>();
  const api = useApi();

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
   /*  const response = await api.get("/api/borrowers/pipeline");
    if (response && response) {
      setPipelineData(response.pipeline_response);
    }  */
      setPipelineData(pipelineMockData.pipeline_response);
    
  };

  return (
    <Card className="w-full p-2">
      <h2 className="text-xl font-bold">Pipeline</h2>
      <p className="text-sm text-muted-foreground">
        Card description goes here.
      </p>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2">
          <TabsTrigger value={"New"}>New</TabsTrigger>
          <TabsTrigger value={"In Review"}>In Review</TabsTrigger>
          <TabsTrigger value={"Approved"}>Approved</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="space-y-2">
            {pipelineData?.[tabKeyMap[activeTab]]?.map((borrower) => (
              <Card
                key={borrower.id}
                className={` p-2 cursor-pointer ${
                  activeProfile?.id === borrower.id
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => setActiveProfile(borrower)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">{borrower.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {borrower.loan_type}
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

export default BorrowerPipeline;
