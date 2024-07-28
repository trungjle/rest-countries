import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { CountryListFilters } from '../../api/countriesService';

type CountriesTableFiltersProps = {
  onChange: (filters: CountryListFilters) => void;
};

export default function CountriesTableFilters({
  onChange,
}: CountriesTableFiltersProps) {
  const [searchText, setSearch] =
    useState<CountryListFilters['searchText']>('');
  const [searchFilter, setSearchFilter] =
    useState<CountryListFilters['searchFilter']>('name');
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    onChange({ searchFilter, searchText: debouncedSearch });
  }, [debouncedSearch, searchFilter]);

  return (
    <div className="flex flex-row gap-2">
      <select
        value={searchFilter}
        onChange={(e) =>
          setSearchFilter(e.target.value as CountryListFilters['searchFilter'])
        }
      >
        <option value="name">Name</option>
        <option value="currency">Currency</option>
        <option value="language">Language</option>
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search by ${searchFilter}`}
      />
    </div>
  );
}
