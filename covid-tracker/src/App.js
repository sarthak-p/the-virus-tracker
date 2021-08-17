import React, { useEffect, useState } from "react";
import './App.css';
import { MenuItem, FormControl, Select, CardContent, Card } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph"; 

function App() {

  //STATE = writing a variable in REACT
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
              const sortedData = sortData(data);
              setTableData(sortedData); 
              setCountries(countries);
          });
    };
    getCountriesData(); 
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode); 

  const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  
   await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
    });
};
  
console.log("Country info", countryInfo);

  
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
        <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
        
        <Map />
    </div>
      
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} /> 
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
