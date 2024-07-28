import { useState } from 'react';
import { CountryListFilters } from '../api/countriesService';

export const useCountrySearch = () => {
  const [searchFilter, setSearchFilter] =
    useState<CountryListFilters['searchFilter']>('name');
  const [searchText, setSearchText] =
    useState<CountryListFilters['searchText']>('');

  const filters: CountryListFilters = {
    searchFilter,
    searchText,
  };

  return {
    filters,
    setSearchFilter,
    setSearchText,
  };
};
