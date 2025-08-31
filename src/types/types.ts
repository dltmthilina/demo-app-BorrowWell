export type BorrowerSummary = {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
};

export type BorrowerPipeline = {
    new: BorrowerSummary[];
    in_review: BorrowerSummary[];
    approved: BorrowerSummary[];
}

export type PipelineTab = "New" | "In Review" | "Approved";
