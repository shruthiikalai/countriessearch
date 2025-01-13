import React, { useState, useEffect } from 'react';
import './App.css';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        //const response = await fetch('https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio');
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
          }
          const data = await response.json();
          setCountries(data);
        } catch (err) {
          console.error(err);
          setError('Error fetching country data');
        }
      };
  
      fetchCountries();
    }, []);
  
    const filteredCountries = countries.filter((country, index, self) => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      self.findIndex(c => c.name === country.name) === index
    );
  
    return (
      <div className="country-search-container">
        <h1>Country Search</h1>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {error && <div className="error-message">{error}</div>}
        <div className="country-grid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div key={country.name} className="countryCard">
                <img src={country.flag} alt={country.name} className="country-flag" />
                <p>{country.name}</p>
              </div>
            ))
          ) : (
            <p>No countries found</p>
          )}
        </div>
      </div>
    );
  };
  
  export default CountrySearch;
  