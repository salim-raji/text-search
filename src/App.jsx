import React, { useState } from 'react';
import './App.css';
import { data } from './data.js';

function App() {
  const [search, setSearch] = useState('');
  const highlightText = (text) => {
    if (!search) return text; 
    const regex = new RegExp(`(${search})`, 'gi'); 
    const parts = text.split(regex); 
    return parts.map((part, index) => 
      regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
    ); 
  };

  const filteredItems = data.filter((item) => {
    return search.toLowerCase() === '' 
      ? item 
      : item.Title.toLowerCase().includes(search) || item.Text.toLowerCase().includes(search);
  });


  return (
    <div className='search-form'>
      <h1>Search</h1>
      <input 
        className='search-bar'
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='Search...' 
      />

      <p>{filteredItems.length} item found</p>
      {filteredItems
        .map((item, index) => (
          <div key={index} className='data-container'>
            <h1>{highlightText(item.Title)}</h1>
            <p>{item.DateCreated}</p>
            <p>{highlightText(item.Text)}</p>
            <hr></hr>
          </div>
        ))}
    </div>
  );
}

export default App;
