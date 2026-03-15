export type BusinessTag = "low2k" | "low5k" | "solo" | "high" | "indoor" | "outdoor";

export interface Benchmark {
  leads: [number, number];
  quotes: [number, number];
  jobs: [number, number];
  revenue: [number, number];
}

export interface Script {
  title: string;
  body: string;
}

export interface Phase {
  title: string;
  goal: string;
  tasks: string[];
  benchmarks: Benchmark;
}

export interface BusinessCosts {
  equipment: string;
  insurance: string;
  marketing: string;
  software: string;
  misc: string;
}

export interface Business {
  id: string;
  name: string;
  tags: BusinessTag[];
  startup_cost_range: string;
  revenue_90_range: string;
  revenue_1yr_range: string;
  margin_range: string;
  difficulty: string;
  recommended_first_offer: string;
  phaseBenchmarks: Benchmark[];
  costs: BusinessCosts;
  tools: string[];
}

export interface KPIData {
  leads: number;
  quotes: number;
  jobs: number;
  revenue: number;
  reviews: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export interface WeekGroup {
  title: string;
  weeks: number[];
}
