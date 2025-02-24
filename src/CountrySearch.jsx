import React, { useState, useEffect } from 'react';
import './App.css';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log('API call started...');
        const response = await fetch('https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio');
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        console.log('API call successful. Response data:', data);

        const transformedData = data.map((country) => ({
          name: country.common || 'Unknown',
          flag: country.png || '',
        }));

        console.log('Transformed data:', transformedData);
        setCountries(transformedData);
      } catch (err) {
        console.error(`Error fetching countries: ${err.message}`);
        setError('Error fetching country data');
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Search Term:', searchTerm);
  console.log('Filtered Countries:', filteredCountries);

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
              <img
                src={country.flag || 'https://via.placeholder.com/150?text=No+Flag'}
                alt={country.name}
                className="country-flag"
              />
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
