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


export type BorrowerDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
};

export type NotificationType = "success" | "error";