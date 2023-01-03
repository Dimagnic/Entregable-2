import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {

  const [station, setStation] = useState({})

  useEffect(() => {

    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1865dc35163e845c24010d6666f1f7db`)
        .then(res => setStation(res.data))


      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

  }, [])
const [changes , setChanges]= useState (false)
const celsius = station.main?.temp - 273.15
const farenheit = (celsius * 9)/5 + 32
const celsius2 = celsius.toFixed(2)
const farenheit2 = farenheit.toFixed(2)


  function change (){
    setChanges (!changes)
  }

  console.log(station)
  return (
    <div className="App">

      <h1>Wheather App</h1>
      <h5>{`${station.sys?.country}, ${station?.name}`}</h5>
      <img src={`http://openweathermap.org/img/wn/${station.weather?.[0].icon}@2x.png`} alt="" />
      <h5>{changes ? celsius2 : farenheit2 }{' '}{changes ?"Celsius" : "Fahrenheit"  }</h5>
      <button onClick={change}>{changes ? "Change Fahrenheit" : "Changes Celsius"}</button>
    </div>

  )
}

export default App
