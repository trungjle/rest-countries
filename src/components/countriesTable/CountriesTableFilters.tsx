import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { CountryListFilters } from '../../api/countriesService';

type CountriesTableFiltersProps = {
  onChange: (filters: CountryListFilters) => void;
};

export default function CountriesTableFilters({
  onChange,
}: CountriesTableFiltersProps) {
  const [search, setSearch] = useState<CountryListFilters['search']>('');
  const [filterBy, setFilterBy] =
    useState<CountryListFilters['filterBy']>('name');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onChange({ filterBy, search: debouncedSearch });
  }, [debouncedSearch, filterBy]);

  return (
    <div className="flex flex-row gap-2">
      <select
        value={filterBy}
        onChange={(e) =>
          setFilterBy(e.target.value as CountryListFilters['filterBy'])
        }
      >
        <option value="name">Name</option>
        <option value="currency">Currency</option>
        <option value="language">Language</option>
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search by ${filterBy}`}
      />
    </div>
  );
}
