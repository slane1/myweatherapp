import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { Sunrise, Sunset } from '../util/icons'
import { UilTear, UilWind, UilEye } from '@iconscout/react-unicons'

export default function Weather() {
    const { 
      city, weatherData, hourlyData, dailyData, weatherIcon, hourlyIcon, dailyIcon,
      } = useContext(DataContext);
  
    return (
      <div>
      <div className=' w-80 rounded-lg h-auto min-h-24 p-4 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-12'>
        <div className='flex-row flex justify-end relative'> {/* To position the WeatherIcon on the top right corner */}
          <img src={weatherIcon} alt="" className='w-20 h-20 z-30 absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0' />
        </div>
        <div className='flex flex-col items-start'>
          <p>{city}</p>
          <p className='text-4xl font-semibold font-Poppins'>{weatherData && weatherData.temp} °C</p>
          <small className='font-Poppins text-xs'>Feels like {weatherData && weatherData.feelslike}°C</small>
        </div>
        <div className='flex flex-row justify-between items-center mt-8'>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilTear />
            <p>{weatherData && weatherData.humidity}%</p></div>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilWind />
            <p>{weatherData && weatherData.windspeed} km/h</p></div>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilEye />
            <p>{weatherData && weatherData.visibility} km</p></div>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center mt-8 w-80'>
        <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 h-20 rounded-lg flex flex-row justify-around items-center w-36 p-2'>
          <img src={Sunrise} className='w-12' />
          <p className='text-lg font-Poppins'>{weatherData && weatherData.sunrise}</p>
        </div>
        <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 h-20 rounded-lg flex flex-row justify-around items-center w-36 p-2'>
          <img src={Sunset} className='w-12' /><p className='text-lg font-Poppins'>{weatherData && weatherData.sunset}</p>
        </div>
      </div>
      <div className='w-80 rounded-lg h-auto min-h-24 p-2 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-8'>
        <div className='flex flex-row justify-between items-stretch h-auto w-[]'>
  
          {hourlyData.slice(1, 6).map((hour, index) => (
            <div
              key={index}
              className='bg-gradient-to-t from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 rounded-lg flex flex-col justify-between items-center align-middle w-14 h-auto p-2 '
            >
              <p
                id='timefc'
                className='font-Poppins text-sm font-semibold mb-2'
              >
                {hour.datetime.split(':').slice(0, 2).join(':')}{' '}
  
              </p>
              <img src={hourlyIcon[index]} className='w-12' />
              <p id='tempfc' className='font-Poppins text-sm mt-2'>
                {hour.temp}°C
              </p>
            </div>
          ))}
  
  
        </div></div>
  
      <div className='w-80 rounded-lg h-auto min-h-24 p-2 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-8'>
        <div className='flex flex-row justify-between items-center h-auto'>
  
  
  
          {dailyData.slice(1, 6).map((day, index) => {
            const date = new Date(day.datetime);
            const formattedDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  
            return (
              <div
                key={index}
                className='bg-gradient-to-t from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300  rounded-lg flex flex-col justify-center items-center w-14 h-auto p-2'
              >
                <p id="dailydate" className='font-Poppins text-sm font-semibold mb-2'>{formattedDate}</p>
                <img src={dailyIcon[index]} className='w-12' />
                <p id="dailytemp" className='font-Poppins text-sm mt-2'>{day.tempmax}°C</p>
              </div>
            );
          })}
  
  
  
  
        </div>
      </div>
  
    </div>
    )
}