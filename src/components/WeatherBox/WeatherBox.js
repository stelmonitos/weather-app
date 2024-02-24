import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');

  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a9c3691799c5c79f3a676a72319f2c8&units=metric`)
      .then(res => res.json())
      .then(data => {
        setPending(false);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeather(weatherData); // Update local state with weatherData
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && <WeatherSummary {...weather} />}
      {pending && <Loader />}
    </section>
  )
};

export default WeatherBox;