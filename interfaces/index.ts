export interface ValuesQuery {
  amount: number | string;
  from: string;
  to: string;
  date?: string;
}

export interface ValuesResponse {
  success?: boolean;
  query?: ValuesQuery;
  info?: {};
  date?: string;
  result?: number;
}

export interface ListSymbols {
  value: string;
  label: string;
}
