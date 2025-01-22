import React, { useState, useEffect } from 'react';
import './App.css';

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();

        // Transform data to ensure country.name exists
        const transformedData = data.map((country) => ({
          name: country.common || 'Unknown',
          flag: country.png || '', // ensure flag is an empty string if not available
        }));

        setCountries(transformedData);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Error fetching country data');
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

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
