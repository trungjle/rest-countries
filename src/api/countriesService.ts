import axios from 'axios';
import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export type CountryListFilters = {
  searchFilter?: 'name' | 'currency' | 'language';
  searchText?: string;
};

const getEndpoint = (searchFilter: string, search: string) => {
  const endpoints: { [key: string]: string } = {
    name: `/name/${search}`,
    currency: `/currency/${search}`,
    language: `/lang/${search}`,
  };
  return endpoints[searchFilter] || '/all';
};

export const fetchCountries = async (
  filters: CountryListFilters
): Promise<Country[]> => {
  const { searchText, searchFilter = 'name' } = filters;

  const endpoint =
    searchText && searchText.trim()
      ? getEndpoint(searchFilter, searchText.trim())
      : '/all';

  return await axios
    .get(`${BASE_URL}${endpoint}`)
    .then((response) => response.data)
    .catch(() => []);
};
