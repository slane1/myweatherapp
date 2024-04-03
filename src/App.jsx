import './App.css'
import React from 'react'
import * as Unicons from '@iconscout/react-unicons'
import Searchbar from './components/Searchbar'
import Weather from './components/Weather'

export default function App() {
  return (
    <div className="flex flex-col items-center w-full h-screen lg:h-screen bg-gradient-to-b from-light-keppel-800 to-light-emerald-700 my-auto pt-6 pb-10 ">
      <Searchbar />
      <hr className='border border-light-verdigris-400 mb-2 w-80'></hr>
      <Weather />
    </div>
  );

}