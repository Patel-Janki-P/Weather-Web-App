const ForeCast = ({forecast}) => {
    
    // static data

    // const forecast = [
    //     { temperature: "22°C", day: "Friday", date: "1 May", icon: "🌥" },
    //     { temperature: "24°C", day: "Saturday", date: "2 May", icon: "🌤" },
    //     { temperature: "25°C", day: "Sunday", date: "3 May", icon: "🌤" },
    //     { temperature: "20°C", day: "Monday", date: "4 May", icon: "🌦" },
    //     { temperature: "28°C", day: "Tuesday", date: "5 May", icon: "⛅" },
    // ];

    // const hourlyForeCast = [
    //     { time: "12:00 PM", degree: "25°C", icon: "⛅", windspeed: "2km/h", },
    //     { time: "1:00 PM", degree: "26°C", icon: "⛅", windspeed: "3km/h", },
    //     { time: "2:00 PM", degree: "27°C", icon: "🌦", windspeed: "2km/h", },
    //     { time: "3:00 PM", degree: "28°C", icon: "🌦", windspeed: "3km/h", },
    //     { time: "4:00 PM", degree: "29°C", icon: "🌤", windspeed: "3km/h", },
    // ];

    // dynamic data

    const dailyForecast = forecast.reduce((acc, item) => {
  const fullDate = new Date(item.dt * 1000);
  const dateOnly = fullDate.toLocaleDateString("en-US"); // e.g., "5/29/2025"

  const alreadyExists = acc.find(f => f.date === dateOnly);

  if (!alreadyExists) {
    acc.push({
      temperature: `${item.main.temp}°C`,
      day: fullDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateOnly,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    });
  }

  return acc;
}, []).slice(0, 5);


    const hourlyForeCast = forecast.slice(0,5).map(item => ({  
        time: new Date(item.dt * 1000).toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }),
        degree: `${item.main.temp}°C`,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        windspeed: `${item.wind.speed}`,
     }));

    return (
        <div className="flex flex-col lg:flex-row gap-6 m-4">
            <div className="flex-row px-4 py-4 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white w-1/3">
                <h2 className="flex items-center justify-center font-bold text-2xl">5 Days Forecast</h2>
                {dailyForecast.map((cast, index) => (
                    <div key={index} className="flex flex-row justify-between items-center p-2">
                        <img src={cast.icon} alt="weather icon" className="w-12 h-12" />
                        <p className="font-bold items-center">{cast.temperature}</p>
                        <p className="font-bold">{cast.day}, {cast.date}</p>
                    </div>
                ))}
            </div>

            <div className="flex-row px-4 py-4 bg-gray-400 shadow-2xl rounded-lg text-black w-2/3">
                <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Hourly Forecast</h1>
                <div className="flex justify-around items-center gap-4 h-54 mt-14 text-white">
                    {hourlyForeCast.map((hourCast, index) => (
                        <div key={index} className="flex flex-col items-center gap-5 bg-[#1c2938] shadow-md w-28 shadow-black rounded-lg p-4">
                            <p className="text-sm font-medium">{hourCast.time}</p>
                            <img src={hourCast.icon} alt="weather icon" className="w-16 h-16 select-none" />
                            <p>{hourCast.degree}</p>
                            <p>{hourCast.windspeed} km/h </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForeCast;