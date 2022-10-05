import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data, filterByName, filterByNumericValues } = useContext(MyContext);

  function filterNumeric(list, filter) {
    const filteredList = [];
    if (filter) {
      const { column, comparison, value } = filter;
      switch (comparison) {
      case 'maior que': {
        list.forEach((element) => {
          if (parseInt(element[column], 10) > parseInt(value, 10)) {
            filteredList.push(element);
          }
        });
        return filteredList;
      }
      case 'igual a': {
        list.forEach((element) => {
          if (element[column] === value) {
            filteredList.push(element);
          }
        });
        return filteredList;
      }
      case 'menor que': {
        list.forEach((element) => {
          if (parseInt(element[column], 10) < parseInt(value, 10)) {
            filteredList.push(element);
          }
        });
        return filteredList;
      }
      default:
        return list;
      }
    }
    return list;
  }

  function filterVariousNumeric(planetList) {
    let list = [...planetList];
    filterByNumericValues.forEach((filter) => {
      const newList = filterNumeric(list, filter);
      list = [...newList];
    });
    return list;
  }

  const tableHeaders = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={ header }>
              { header }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        { filterVariousNumeric(data.filter(
          (element) => element.name.includes(filterByName.name),
        )).map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>
              {planet.films.map((film) => (
                <p key={ film }>{film}</p>
              ))}
            </td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
