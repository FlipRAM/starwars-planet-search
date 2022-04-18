import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchForm() {
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [dropdownColumn, setdropdownColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(MyContext);
  const { name } = filterByName;

  const dropdownComparison = [
    'maior que',
    'menor que',
    'igual a',
  ];

  function handleChange({ target }) {
    const { value } = target;
    setFilterByName((state) => ({
      ...state,
      name: value,
    }));
  }

  function handleNumericChange({ target }) {
    const { value } = target;
    setNumericFilter((state) => ({
      ...state,
      [target.name]: value,
    }));
  }

  function sendFilter() {
    const { column } = numericFilter;
    const indexToRmv = dropdownColumn.indexOf(column);
    setdropdownColumn(dropdownColumn.filter((element, index) => index !== indexToRmv));
    setFilterByNumericValues((state) => (
      [...state, numericFilter]
    ));
  }

  useEffect(() => {
    setNumericFilter({
      column: dropdownColumn[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [dropdownColumn]);

  function handleRemoveFilter({ target }) {
    const { value } = target;
    if (value === 'one') {
      setdropdownColumn((state) => ([
        ...state,
        target.name,
      ]));
      setFilterByNumericValues(
        filterByNumericValues.filter((element) => element.column !== target.name),
      );
    } if (value === 'all') {
      setdropdownColumn([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
      setFilterByNumericValues([]);
    }
  }

  return (
    <form>
      <label htmlFor="name">
        Planet Name:
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ handleChange }
          id="name"
        />
      </label>
      <label htmlFor="column">
        Column:
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          onChange={ handleNumericChange }
          value={ numericFilter.column }
        >
          {dropdownColumn.map((column) => (
            <option key={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        Comparison:
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          onChange={ handleNumericChange }
          value={ numericFilter.comparison }
        >
          {dropdownComparison.map((each) => (
            <option key={ each }>
              {each}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="value">
        Value:
        <input
          type="number"
          data-testid="value-filter"
          id="value"
          name="value"
          onChange={ handleNumericChange }
          value={ numericFilter.value }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ sendFilter }
      >
        Filter
      </button>
      <div>
        { filterByNumericValues.map((it) => (
          <p
            key={ `${it.column} filter` }
            data-testid="filter"
          >
            {`${it.column} ${it.comparison} ${it.value}`}
            <button
              type="button"
              name={ it.column }
              value="one"
              onClick={ handleRemoveFilter }
            >
              X
            </button>
          </p>
        ))}
        <button
          data-testid="button-remove-filters"
          type="button"
          value="all"
          onClick={ handleRemoveFilter }
        >
          Remover Todas as Filtragens
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
