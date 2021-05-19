import React from 'react'
import { DegreesToDirection, Month, Weekday, Day } from '../../utilits'

export const WeatherData = ({ data }) => {

  // getting the data from parent componet using props
  const { name, country, temp, 
          description, temp_min, temp_max, icon, 
          feels_like, speed, deg, humidity
        } = data;

  return (
    <>
      <header>
        <h5>{Weekday}, {Month} {Day}</h5>
      </header>
      <main>
        <div className='weather-main'>
          <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
          className='weather-icon'/>
          <div>
            <h2>{name}, {country}</h2>
            <h3 className='description'>{description}</h3>
          </div>
        </div>
        <div className='temp-main'>
          <h5>Feels like {feels_like} °</h5>
          <h1 className='temperature'>{temp}°</h1>
          <div className='hi-lo'>
            <h5>Max {temp_max}°</h5>
            <h5>Min {temp_min}°</h5>
          </div>
        </div>
      </main>
      <footer>
        <div className='weather-prop'>
          <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
        </div>
        <div className='weather-prop'>
          <h4>{humidity} %</h4>
        </div>
      </footer>
    </>
  );
}



// this is a weather display component 
// this is a child component of ../pages/ weatherdetails component