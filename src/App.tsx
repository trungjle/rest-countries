import React, { useCallback, useMemo } from 'react';
import { CountryListFilters } from './api/countriesService';
import './App.css';
import CountriesTable from './components/countriesTable/CountriesTable';
import CountriesTableSearch from './components/countriesTable/CountriesTableSearch';
import { useCountries } from './hooks/useCountries';
import { useCountrySearch } from './hooks/useCountrySearch';
import { useFavourites } from './hooks/useFavourites';

function App() {
  const { handleFavourite, isFavourite } = useFavourites();
  const { filters, setSearchFilter, setSearchText } = useCountrySearch();
  const { data, isFetching } = useCountries(filters);

  const memoizedData = useMemo(() => data, [data]);

  const handleFiltersChange = useCallback(
    (filters: CountryListFilters) => {
      setSearchFilter(filters.searchFilter);
      setSearchText(filters.searchText);
    },
    [setSearchFilter, setSearchText]
  );

  return (
    <div className="App">
      <header>
        <h1>Countries</h1>
      </header>
      <div>
        <CountriesTableSearch onChange={handleFiltersChange} />
        {memoizedData && (
          <CountriesTable
            countries={memoizedData}
            isFavourite={isFavourite}
            onFavouriteClick={handleFavourite}
          />
        )}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
