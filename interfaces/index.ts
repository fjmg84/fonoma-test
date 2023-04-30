export interface ValuesQuery {
  amount: number;
  from: string;
  to: string;
}

export interface ValuesResponse {
  success?: boolean;
  query?: ValuesQuery;
  info?: {};
  date?: string;
  result?: number;
}
