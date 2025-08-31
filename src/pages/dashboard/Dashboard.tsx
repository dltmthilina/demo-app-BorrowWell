import BorrowerDetailCard from "@/components/borrower/BorrowerDetailCard";
import BrokerOverview from "@/components/broker/BrokerOverview";
import BorrowerPipeline from "@/components/pipeline/BorrowerPipeline";

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BorrowerPipeline />
        <BorrowerDetailCard />
        <BrokerOverview />
      </div>
    </>
  );
}

export default Dashboard;
