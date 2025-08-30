
import { Card } from "@/components/ui/card";
import PipelineCard from "@/components/pipeline/PipelineCard";



function Dashboard() {
 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PipelineCard/>
        <Card className="w-full p-2">
          <h2 className="text-xl font-bold">Borrower</h2>
          <p className="text-sm text-muted-foreground">
            Card description goes here.
          </p>
        </Card>
        <Card className="w-full p-2">
          <h2 className="text-xl font-bold">Brocker</h2>
          <p className="text-sm text-muted-foreground">
            Card description goes here.
          </p>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
