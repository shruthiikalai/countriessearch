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
          common: country.common || 'Unknown',
          png: country.png || '', // ensure flag is an empty string if not available
        }));

        setCountries(transformedData);
      } catch (err) {
        console.error(err);
        setError('Error fetching country data');
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.common.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div key={country.common} className="countryCard">
              {/* Check if flag URL is valid */}
              <img
                src={country.png ? country.png : 'https://via.placeholder.com/150?text=No+Flag'}
                alt={country.common}
                className="country-flag"
              />
              <p>{country.common}</p>
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
