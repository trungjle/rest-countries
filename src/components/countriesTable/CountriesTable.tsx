import React from 'react';
import { ColDef } from 'ag-grid-community';
import { Country } from '../../types/country';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const columnsDefs: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name.official',
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
];

interface CountriesTableProps {
  countries: Country[];
}

const CountriesTable = ({ countries }: CountriesTableProps) => {
  return (
    <div className="ag-theme-balham" style={{ height: '1000px' }}>
      <AgGridReact
        masterDetail={true}
        columnDefs={columnsDefs}
        autoSizeStrategy={{ type: 'fitGridWidth', defaultMinWidth: 400 }}
        rowData={countries}
      />
    </div>
  );
};

export default CountriesTable;
