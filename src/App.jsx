import { useState } from "react";

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [city , setCity] = useState("");  
    const [weatherData, setweatherData] = useState(null);
    const [errorMessage , setErrorMessage] = useState(null);
    const [loading, setloading] = useState("d-none");
    const [showErrorMessage, setshowErrorMessage] = useState("d-none");
    /* console.log(weatherData.data[0].temp);
    console.log(weatherData.data[0].humidity);
    console.log(weatherData.data[0].wind_speed); */
    let cityName;
    let lat;
    let lon;
    function getWeatherData(lat , lon , city){
        fetch(`https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            data.data[0].city = city;
            console.log(data.data[0]);
            setweatherData(data);
        })
    }
    function getDirectGeocoding(city){
        setweatherData(null);
        setErrorMessage(null);
        setloading("");
        setshowErrorMessage("d-none");
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(data => data.json())
        .then(data => {
            if(data[0]?.lat != undefined){
                lat =  data[0].lat;
                lon = data[0].lon;
                cityName = data[0].name;
                getWeatherData(lat , lon , cityName);
            }else{
                erorrHandler(data);
            }
        })
    }
    function erorrHandler(data){
        setloading("d-none");
        setshowErrorMessage("");
        if(!Array.isArray(data)){
            switch (Number(data.cod)) {
                case 400:
                    setErrorMessage("“Location was not found. Please check the spelling and try again.“");
                    break;

                case 401:
                    setErrorMessage("“Unable to retrieve weather data. Please try again later.”");
                    break;
            
                case 429:
                    setErrorMessage("“Too many requests. Please wait a moment before trying again.”");
                    break;

                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                    setErrorMessage("“Weather service is temporarily unavailable. Please try again later.”");
                    break;

                default:
                    break;
            }
        }else{
            setErrorMessage("“Location was not found. Please check the spelling and try again.“");
        }
    }
    if(weatherData === null){
        return(
            <>
                <header className="text-center">
                    <h1 className="animate__animated animate__fadeInDown header-title">
                        Weather API 
                    </h1>
                    <h3 className="animate__animated animate__fadeInDown header-text">
                        know the weather in your location now
                    </h3>
                </header>
                <main className="mt-12 text-center">
                    <div className="form-field mx-auto animate__animated animate__fadeInDown main-inp">
                        <label htmlFor="fieldText" className="form-label fs-xl">Name of the location</label>
                        <input
                            type="text"
                            className="form-control bg-white fg-black"
                            id="fieldText"
                            placeholder="Enter the location here"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
    
                        <button
                            type="button"
                            className="btn-solid theme-primary"
                            onClick={() => getDirectGeocoding(city)}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className={`spinner-border mt-12 ` + loading} role="status">
                        <span className="visually-hidden">Loading…</span>
                    </div>
                    <div className={`alert theme-danger error-con justify-content-center  `+ showErrorMessage} role="alert">{errorMessage}</div>
                </main>
            </>
        )
    }
    else{
        return(
            <>
                <header className="text-center">
                    <h1 className="animate__animated animate__fadeInDown header-title">
                        Weather API 
                    </h1>
                    <h3 className="animate__animated animate__fadeInDown header-text">
                        know the weather in your location now
                    </h3>
                </header>
                <main className="mt-12">
                    <div className="form-field mx-auto animate__animated animate__fadeInDown main-inp">
                        <label htmlFor="fieldText" className="form-label fs-xl">Name of the location</label>
                        <input
                            type="text"
                            className="form-control bg-white fg-black"
                            id="fieldText"
                            placeholder="Enter the location here"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn-solid theme-primary"
                            onClick={() => getDirectGeocoding(city)}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className="overflow-hidden">
                        <div className="output-con mt-12 d-flex animate__animated animate__fadeInDown">
                            <i className="fa-solid fa-cloud-sun fs-6xl"></i>
                            <h1 className="fs-6xl">
                                {(weatherData.data[0].temp).toFixed(0)}<sup>o</sup>C
                            </h1>
                            <h1 className="fs-6xl">
                                {weatherData.data[0].city}
                            </h1>
                            <div className="d-flex mt-12 justify-content-between h-and-w">
                                <div className="d-flex align-items-center gap-10 humidity">
                                    <i className="fa-solid fa-water fs-6xl"></i>
                                    <div className="d-flex flex-column">
                                        <h1>
                                            {weatherData.data[0].humidity}% 
                                        </h1>
                                        <h1>
                                            Humidity
                                        </h1>
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center gap-10 wind">
                                        <i className="fa-solid fa-wind fs-6xl"></i>
                                        <div className="d-flex flex-column">
                                            <h1>
                                                {weatherData.data[0].wind_speed}km/h
                                            </h1>
                                            <h1>
                                                wind speed
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
  
}

export default App
