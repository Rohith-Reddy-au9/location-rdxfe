import React from 'react';


import WeatherDetails from './pages//weather/weatherdetails'
import Converter from './pages/currency/curr'
import GeoLocation from './pages/maps/map'
function App() {
  return (

    <div className="main-components">
      
      <div class="row">
        <div class="col">
          <WeatherDetails /> 

        </div>
        <div class="col">
          <GeoLocation />
        </div>
        <div class="col">
          <Converter />
        </div>
      </div>
    </div>
  );
}
export default App;