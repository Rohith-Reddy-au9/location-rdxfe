// parent componet

import React from 'react';
import './weatherdetails.scss';

import { WeatherData } from '../../components/weather/weather'
import  StatusData  from '../../components/weather/status'

const WEATHER_API_KEY = '46e141cdf2ff8b576c7629f94611e1fd'

class WeatherDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'init',
            isLoaded: false,
            weatherData: null
        }
    }

    abortController = new AbortController();
    controllerSignal = this.abortController.signal;

    // intializing weather data

    weatherInit = () => {

        // if success it get the data 
        // shows error message
        const success = (position) => {
            this.setState({status: 'fetching'});
            localStorage.setItem('location-allowed', true);
            this.getWeatherData(position.coords.latitude, position.coords.longitude);
        }
        
        const error = () => {
            this.setState({status: 'unable'});
            localStorage.removeItem('location-allowed');
            alert('Unable to retrieve location.');
        }
        
        // if he enables location it get the location details otherwise
        // shoes error message
        if (navigator.geolocation) {
                this.setState({status: 'fetching'});
                navigator.geolocation.getCurrentPosition(success, error);
        } else {
                this.setState({status: 'unsupported'});
                alert('Your browser does not support location tracking, or permission is denied.');
        }
    }

    // we will get the data from the api
    getWeatherData = (lat, lon) => {
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

        // console.log("latitude", lat)
        // console.log("longitude", lon)

        fetch(weatherApi, { signal: this.controllerSignal })
        .then(response => response.json())
        .then(
            (result) => {
                // console.log("weather-------->",result);
                    // this data from the api key
                const { name } = result;
                const { country } = result.sys;
                const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
                const { description, icon } = result.weather[0];
                const { speed, deg } = result.wind;

                this.setState({
                    status: 'success',
                    isLoaded: true,
                    weatherData: {
                        name,
                        country,
                        description,
                        icon,
                        temp: temp.toFixed(2),
                        feels_like: feels_like.toFixed(1),
                        temp_min: temp_min.toFixed(1),
                        temp_max: temp_max.toFixed(1),
                        speed,
                        deg,
                        humidity
                    }
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }
    // click event if you are not allow your location then only it shows a button 
    onClick = () => {
        this.weatherInit();
    }

    // in this function we are passing the data from parrent to child componet
    weatherView = (status) => {
        switch(status) {
        case 'init':
            return(
                <button 
                    className='btn-main' 
                    onClick={this.onClick}
                >
                    Weather Report
                </button>
            );
        case 'success':
            return <WeatherData data={this.state.weatherData} />;
        default:
            return <StatusData status={status} />;
        }
    }

    // if location allowed then only weatherinit function will initialize 
    componentDidMount() {
        if(localStorage.getItem('location-allowed')) {
            this.weatherInit();
        } else {
            return;
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <div className='weather'>
                <div className='container'>
                {this.weatherView(this.state.status)}
                </div>
            </div>
        );
    }
}

export default WeatherDetails;