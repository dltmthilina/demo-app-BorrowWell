import { useContext, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import pipelineMockData from "../../mock-data/pipeline.json";
import useApi from "@/hooks/use-api";
import type { BorrowerPipeline, BorrowerSummary } from "@/types/types";
import { AppContext } from "@/context/AppContext";
import { formatCurrency } from "@/utils/utils";

const tabKeyMap: Record<string, keyof BorrowerPipeline> = {
  New: "new",
  "In Review": "in_review",
  Approved: "approved",
};

const BorrowerPipeline = () => {
  const [activeTab, setActiveTab] = useState<string>("New");
  const [radioValue, setRadioValue] = useState("active");
  const [pipelineData, setPipelineData] = useState<BorrowerPipeline>();
  const api = useApi();
  const ctx = useContext(AppContext);

  useEffect(() => {
    fetchPipelineData();
  }, []);

  useEffect(() => {
    if (
      pipelineData &&
      !ctx?.activeProfileId &&
      pipelineData[tabKeyMap[activeTab]] &&
      pipelineData[tabKeyMap[activeTab]].length > 0
    ) {
      ctx?.setActiveProfileId(pipelineData[tabKeyMap[activeTab]][0].id);
    }
  }, [pipelineData, activeTab]);

  const fetchPipelineData = async () => {
    /*  const response = await api.get("/api/borrowers/pipeline");
    if (response && response) {
      setPipelineData(response.pipeline_response);
    }  */
    setPipelineData(pipelineMockData.pipeline_response);
  };

  return (
    <Card className="w-full px-4 ">
      <h2 className="text-xl font-semibold">Borrowers</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2 flex flex-row justify-start border w-full ">
          <TabsTrigger className="data-[state=active]:bg-primary" value={"New"}>
            New
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary"
            value={"In Review"}
          >
            In Review
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary"
            value={"Approved"}
          >
            Approved
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="space-y-2 max-h-[270px] md:max-h-[350px] overflow-y-auto">
            {pipelineData?.[tabKeyMap[activeTab]]?.map((borrower) => (
              <Card
                key={borrower.id}
                className={` bg-muted p-2 cursor-pointer ${
                  ctx?.activeProfileId === borrower.id
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => ctx?.setActiveProfileId(borrower.id)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">{borrower.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {borrower.loan_type}
                    </div>
                    <span
                      className={`text-xs py-1 rounded bg-muted text-black`}
                    >
                      {borrower.status}
                    </span>
                  </div>
                  <div className="flex flex-col items-end justify-center px-4">
                    <div className="font-bold">
                      {formatCurrency(borrower.amount)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div>
        <div className="text-xs font-bold text-black-foreground mb-2 ">
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
