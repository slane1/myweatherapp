import React, { useState, useEffect, createContext } from 'react'
import { Sun, Cloud, CloudyDay, Fog, Hail, HeavyRain, Rainy, Snowy, Storm, ThunderStorm, Sunrise, Sunset, FullMoon, CloudyNight } from '../util/icons'
const { VITE_WEATHER_API_KEY } = import.meta.env;
import axios from 'axios'

export const DataContext = createContext();
export default function DataContextProvider({ children }) {
    const apiKey = VITE_WEATHER_API_KEY;
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]); 
    const [weatherIcon, setWeatherIcon] = useState('');
    const [hourlyIcon, setHourlyIcon] = useState('');
    const [dailyIcon, setDailyIcon] = useState('');

useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const getCity = async () => {
                    try {
                        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const data = response.data;
                        setCity(data.city);
                    } catch (error) {
                        console.log(error);
                    }
                };
                getCity();
            },
            (error) => {
                console.log("Geolocation permission denied.");
                getCityByIP();
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        getCityByIP();
    }
}, []);
    const getCityByIP = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json');
            const data = response.data;
            setCity(data.city);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const searchInput = document.getElementById("search");
        const button = document.getElementById("button");
        const handleClick = (e) => {
            e.preventDefault();
            setCity(searchInput.value);
        };
        const handleKeyUp = (e) => {
        if (e.key === "Enter") {
        setCity(searchInput.value);
        }
        };
    
        button.addEventListener("click", handleClick);
        searchInput.addEventListener("keyup", handleKeyUp);
    
        return () => {
        button.removeEventListener("click", handleClick);
        searchInput.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const getWeather = async () => {
        try {
            if (city) {
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=${apiKey}&contentType=json`);
            const data = response.data;
            setWeatherData(data.currentConditions);
            const currentTime = new Date().getHours();
            setHourlyData(data.days[0].hours.slice(currentTime, currentTime + 6));
            setDailyData(data.days);
            } else {
                console.log("Please enter a city");
            }
        } catch (error) {
            console.log(error);
        }
        };
        getWeather();
    }, [city]);

    useEffect(() => {
        setWeatherIcon(weatherData.icon);
        switch (weatherData.icon) {
        case 'clear-day':
            setWeatherIcon(Sun);
            break;
        case 'clear-night':
            setWeatherIcon(FullMoon);
            break;
        case 'cloudy':
            setWeatherIcon(Cloud);
            break;
        case 'fog':
            setWeatherIcon(Fog);
            break;
        case 'hail':
            setWeatherIcon(Hail);
            break;
        case 'heavy-rain':
            setWeatherIcon(HeavyRain);
            break;
        case 'partly-cloudy-day':
            setWeatherIcon(CloudyDay);
            break;
        case 'partly-cloudy-night':
            setWeatherIcon(CloudyNight);
            break;
        case 'rain':
            setWeatherIcon(Rainy);
            break;
        case 'snow':
            setWeatherIcon(Snowy);
            break;
        case 'sleet':
            setWeatherIcon(Snowy);
            break;
        case 'thunderstorm':
            setWeatherIcon(ThunderStorm);
            break;
        case 'tornado':
            setWeatherIcon(Storm);
            break;
        default:
            setWeatherIcon(ThunderStorm);
        }
    }, [weatherData.icon]);

    useEffect(() => {
        const icons = hourlyData.slice(1, 6).map(hour => {
        switch (hour.icon) {
        case 'clear-day':
            return Sun;
        case 'clear-night':
            return FullMoon;
        case 'cloudy':
            return Cloud;
        case 'fog':
            return Fog;
        case 'hail':
            return Hail;
        case 'heavy-rain':
            return HeavyRain;
        case 'partly-cloudy-day':
            return CloudyDay;
        case 'partly-cloudy-night':
            return CloudyNight;
        case 'rain':
            return Rainy;
        case 'snow':
        case 'sleet':
            return Snowy;
        case 'thunderstorm':
            return ThunderStorm;
        case 'tornado':
            return Storm;
        default:
            return ThunderStorm;
        }
        });
        setHourlyIcon(icons);
    }, [hourlyData]);

    useEffect(() => {
        const icons = dailyData.slice(1, 6).map(day => {
        switch (day.icon) {
        case 'clear-day':
            return Sun;
        case 'clear-night':
            return FullMoon;
        case 'cloudy':
            return Cloud;
        case 'fog':
            return Fog;
        case 'hail':
            return Hail;
        case 'heavy-rain':
            return HeavyRain;
        case 'partly-cloudy-day':
            return CloudyDay;
        case 'partly-cloudy-night':
            return CloudyNight;
        case 'rain':
            return Rainy;
        case 'snow':
        case 'sleet':
            return Snowy;
        case 'thunderstorm':
            return ThunderStorm;
        case 'tornado':
            return Storm;
        default:
            return ThunderStorm;
        }
        });
        setDailyIcon(icons);
    }, [dailyData]);

    return (
        <DataContext.Provider value={{ 
            city, weatherData, hourlyData, dailyData, weatherIcon, hourlyIcon, dailyIcon,
            setCity, setWeatherData, setHourlyData, setDailyData, setWeatherIcon, setHourlyIcon, setDailyIcon
            }}>
            {children}
        </DataContext.Provider>
    )
}