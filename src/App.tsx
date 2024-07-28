import { useQuery } from '@tanstack/react-query';
import { CountryListFilters, fetchCountries } from './api/countriesService';
import './App.css';
import CountriesTable from './components/countriesTable/CountriesTable';
import CountriesTableFilters from './components/countriesTable/CountriesTableFilters';
import { useState } from 'react';

function App() {
  const [searchFilter, setSearchFilter] =
    useState<CountryListFilters['searchFilter']>('name');
  const [searchText, setSearchText] =
    useState<CountryListFilters['searchText']>('');

  const filters: CountryListFilters = {
    searchFilter,
    searchText,
  };

  const { data, isFetching } = useQuery({
    queryKey: ['countries', searchText],
    queryFn: () => fetchCountries(filters),
  });

  return (
    <div className="App">
      <header>
        <h1>Countries</h1>
      </header>
      <div>
        <CountriesTableFilters
          onChange={(filters: CountryListFilters) => {
            setSearchFilter(filters.searchFilter);
            setSearchText(filters.searchText);
          }}
        />
        {data && <CountriesTable countries={data} />}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
