import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='Elemento'>
          <h1>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h1>
          <ul>
            <h3>Temperatura atual: {weather['main']['temp']}°</h3>
            <h3>Temperatura máxima: {weather['main']['temp_max']}°</h3>
            <h3>Temperatura minima: {weather['main']['temp_min']}°</h3>
            <h3>Pressão: {weather['main']['pressure']} hpa</h3>
            <h3>Humidade: {weather['main']['humidity']}%</h3>
          </ul>
        </div>
      </Fragment>
    );
  }
}
