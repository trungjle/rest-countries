import { useQuery } from '@tanstack/react-query';
import { CountryListFilters, fetchCountries } from './api/countriesService';
import './App.css';
import CountriesTable from './components/countriesTable/CountriesTable';
import CountriesTableFilters from './components/countriesTable/CountriesTableFilters';
import { useState } from 'react';

function App() {
  const [filters, setFilters] = useState<CountryListFilters>({
    filterBy: 'name',
    search: '',
  });

  const { data, isFetching } = useQuery({
    queryKey: ['countries', filters],
    queryFn: () => fetchCountries(filters),
  });

  return (
    <div className="App">
      <header>
        <h1>Countries</h1>
      </header>
      <div>
        <CountriesTableFilters onChange={setFilters} />
        {data && <CountriesTable countries={data} />}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
