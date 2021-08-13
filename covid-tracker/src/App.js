import React, { useEffect, useState } from "react";
import './App.css';
import { MenuItem, FormControl, Select, CardContent, Card} from "@material-ui/core";

function App() {

  //STATE = writing a variable in REACT
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  //USEFFECT = Runs a piece of code based on a given condition 
  useEffect(() => {
    //async -> send a request to the server, wait for it, and do something with it 

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries") //API retrieved from disease.sh
        .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => ({
              name: country.country, //United States, United Kingdom, etc. 
              value: country.countryInfo.iso2, //USA, UK, etc. 
            }));
              setCountries(countries);
          });
    };
    getCountriesData(); 
  }, []);
  
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_header">
        <h1>Covid-19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select
          variant="outlined"
            value={country} >
           <MenuItem value = "worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries 
                and show a dropdown list of the options */}
           
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}


          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value = "worldwide">Option 2</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
          <MenuItem value="worldwide">Nice</MenuItem> */}
        </Select>
      </FormControl>
        </div>
    </div>
  );
}

export default App;
