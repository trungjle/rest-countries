export type Country = {
  cca2: string;
  name: {
    official: string;
  };
  capital: string[];
  population: number;
  flags: {
    svg: string;
  };
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  languages: Record<string, string>;
};
