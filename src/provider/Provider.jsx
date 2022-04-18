import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json());
      setData(results);
    };
    fetchData();
  }, []);

  const context = {
    data,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
