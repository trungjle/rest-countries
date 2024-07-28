import { useQuery } from '@tanstack/react-query';
import { CountryListFilters, fetchCountries } from '../api/countriesService';

export const useCountries = (filters?: CountryListFilters) => {
  const { data, isFetching } = useQuery({
    queryKey: ['countries', filters],
    queryFn: () => fetchCountries(filters),
  });

  return {
    data,
    isFetching,
  };
};
