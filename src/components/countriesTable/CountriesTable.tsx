import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { Country } from '../../types/country';

interface CountriesTableProps {
  countries: Country[];
  onFavouriteClick: (cca2: string) => void;
  isFavourite: (cca2: string) => boolean;
}

const CountriesTable = ({
  countries,
  onFavouriteClick,
  isFavourite,
}: CountriesTableProps) => {
  const columnsDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name.official',
    },
    {
      headerName: 'Flag',
      cellRenderer: (params: { data: Country }) => {
        const { flags, name } = params.data;
        return flags.svg ? (
          <img
            src={flags.svg}
            alt={`Flag of ${name.official}`}
            style={{ width: '50px', height: 'auto' }}
          />
        ) : null;
      },
    },
    {
      headerName: 'Capital',
      field: 'capital',
    },
    {
      headerName: 'Population',
      field: 'population',
    },

    {
      headerName: 'Currency',
      field: 'currency',
      valueGetter: (params: { data: Country }) => {
        const { currencies } = params.data;
        if (!currencies) {
          return 'N/A';
        }
        const currencyNames = Object.values(currencies).map(
          (currency) => currency.name
        );
        return currencyNames.length > 1
          ? currencyNames.join(', ')
          : currencyNames[0];
      },
    },
    {
      headerName: 'Languages',
      valueGetter: (params: { data: Country }) => {
        const { languages } = params.data;
        return languages ? Object.values(languages).join(', ') : 'N/A';
      },
    },
    {
      headerName: 'Favorite',
      cellRenderer: (params: { data: Country }) => {
        const { cca2 } = params.data;
        const handleClick = () => onFavouriteClick(cca2);
        const favoriteStatus = isFavourite(cca2) ? 'Unfavorite' : 'Favorite';

        return <button onClick={handleClick}>{favoriteStatus}</button>;
      },
    },
  ];
  return (
    <div className="ag-theme-balham" style={{ height: '1000px' }}>
      <AgGridReact
        columnDefs={columnsDefs}
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        rowData={countries}
        pagination={true}
        paginationPageSize={50}
      />
    </div>
  );
};

export default CountriesTable;
