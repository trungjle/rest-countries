import axios from 'axios';
import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export type CountryListFilters = {
  filterBy?: 'name' | 'currency' | 'language';
  search?: string;
};

const getEndpoint = (filterBy: string, search: string) => {
  const endpoints: { [key: string]: string } = {
    name: `/name/${search}`,
    currency: `/currency/${search}`,
    language: `/lang/${search}`,
  };
  return endpoints[filterBy] || '/all';
};

export const fetchCountries = async (
  filters: CountryListFilters
): Promise<Country[]> => {
  const { search, filterBy = 'name' } = filters;

  const endpoint =
    search && search.trim() ? getEndpoint(filterBy, search.trim()) : '/all';

  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};
