# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.



## my notes
<!-- my notes -->


<!-- Direct geocoding -->

http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



Ex: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid={API key}

respones = [
   {
      "name":"London",
      "local_names":{
         "ms":"London",
         "gu":"લંડન",
         "is":"London",
         "wa":"Londe",
         "mg":"Lôndôna",
         "gl":"Londres",
         "om":"Landan",
         "ku":"London",
         "ff":"London",
         "kk":"Лондон",
         "uk":"Лондон",
         "pt":"Londres",
         "tr":"Londra",
         "eu":"Londres",
         "ht":"Lonn",
         "ka":"ლონდონი",
         "ur":"علاقہ لندن"
      },
      "lat":51.5073219,
      "lon":-0.1276474,
      "country":"GB",
      "state":"England"
   }
]

Direct geocoding allows to get geographical coordinates (lat, lon) by using name of the location (city name or area name). If you use the limit parameter in the API call, you can cap how many locations with the same name will be seen in the API response (for instance, London in the UK and London in the US).


<!-- Parameters -->

q  : required

City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.

appid : required

Your unique API key (you can always find it on your account page under the "API key" tab)

limit : optional

Number of the locations in the API response (up to 5 results can be returned in the API response)



<!-- Current weather data -->




The API endpoint returns current weather conditions for a specific location with core meteorological parameters such as temperature, feels-like temperature, pressure, humidity, dew point, UV index, cloud cover, visibility, wind speed, wind direction, sunrise and sunset times, and weather condition descriptors with icons. This endpoint is useful for apps and services that need an instant snapshot of weather at a location.




https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&units={units}&appid={API key}


Ex: https://api.openweathermap.org/data/4.0/onecall/current?lat=52.2297&lon=21.0122&units=metric&lang=en&appid={API key} 


response = {
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777449371,
      "sunrise": 1777437375,
      "sunset": 1777490344,
      "temp": 286.42,
      "feels_like": 285.32,
      "pressure": 1024,
      "humidity": 58,
      "dew_point": 278.34,
      "uvi": 1.55,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 8.23,
      "wind_deg": 70,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ]
	  "alerts": [
		"8B46C632-DCA7-44D7-8BDF-02445621BAFF",
		"29F58A35-BB91-4A73-9F46-9FC64BDF604F",
		...
	]
    }
  ]
}


<!-- Parameters -->

lat : required

Latitude, decimal (-90; 90). If you need to automatically convert city names and ZIP codes into geographic coordinates, or vice versa, please use our Geocoding API

lon : required

Longitude, decimal (-180; 180). If you need to automatically convert city names and ZIP codes into geographic coordinates, or vice versa, please use our Geocoding API

appid : required

Your unique API key (you can always find it on your account page under the "API key" tab)

units : optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang : optional

You can use the lang parameter to get the output in your language. Learn more