import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import Table from './components/Table';
import Provider from './provider/Provider';

function App() {
  return (
    <Provider>
      <SearchForm />
      <Table />
    </Provider>
  );
}

export default App;
