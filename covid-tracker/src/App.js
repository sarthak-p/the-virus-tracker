import React, { useEffect, useState } from "react";
import './App.css';
import { MenuItem, FormControl, Select, CardContent, Card } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map"; 

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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode); 
  }
  
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        <h1>Covid-19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}>
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

      <div className="app_stats">
        <InfoBox title="Coronavirus cases" total={2000} cases={500}/>
        <InfoBox title="Recovered" total={5000} cases={500}/>
        <InfoBox title="Deaths" total={6000} cases={500}/>
      </div>
        
        <Map />
    </div>
      
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
