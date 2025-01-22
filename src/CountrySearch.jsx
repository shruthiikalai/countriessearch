import React, { useState, useEffect } from 'react';
import './App.css';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log('Initiating API call...');
        const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
        console.log('API call completed with status:', response.status);

        if (!response.ok) {
          throw new Error(`API returned an error: ${response.status}`);
        }

        const data = await response.json();
        console.log('API call successful. Response data:', data);

        const transformedData = data.map((country) => ({
          name: country.common || 'Unknown',
          flag: country.png || '',
        }));

        console.log('Transformed countries:', transformedData);
        setCountries(transformedData);
      } catch (err) {
        console.error('Error fetching country data:', err.message);
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
                src={country.flag ? country.flag : 'https://via.placeholder.com/150?text=No+Flag'}
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
