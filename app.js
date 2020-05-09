const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location_from_user = process.argv[2]
//console.log(location_from_user)
if(location_from_user === undefined) {
	
	console.log('Please give the location you are searching for')
}
else {

geocode(location_from_user,(error,{longitude,latitude,place} = {} ) => {
	if(error) {
		return console.log(error)
	}
	forecast(longitude,latitude, (error, data) => {
		if(error) {
			return console.log(error)
	}
  		console.log(place)
  		console.log(data)
})
})
}
















/*
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


        forecast(response.latitude,response.longitude, (error, data) => {
                console.log('Error', error)
                console.log('Data', data)
})

*/


/*
//mapbox_url is used for geocoding
const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmlzaGlydXAiLCJhIjoiY2s5NzlhOW1lMHZ1ajNvbjFudmw3cmR0eCJ9.ankUixffN02Z4FD2Rb9TfQ&limit=1'
//const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoibmlzaGlydXAiLCJhIjoiY2s5NzlhOW1lMHZ1ajNvbjFudmw3cmR0eCJ9.ankUixffN02Z4FD2Rb9TfQ&limit=1'

//const url = 'http://api.weatherstack.com/current?access_key=a286ee6768afcac9f6b211d5eb60147a&query=&units=s'

//request() takes 2 arguments - first is options object(where we provide the url and other information.the second is the function to run once we actually have that response.and this callback function will run when either one when we have the weather data or two something went wrong and we weren't able to get the weather data.Maybe there is no internet connection-this request would indeed fail.So,this function below is called with 2 arguments - error (if there was one otherwise this argument will be undefined and it gets called with the response where we can actually access the response..this includes all sorts of information including the JSON data which we need.

//We can add one more property to the options object down below - json : true - this means we would like a request to parse this as json(it will automatically pase the JSON data)

//Geocoding
//address from user -> lat/longituge ->weather


request({url : mapbox_url, json : true},(error,response) => {
	if(error){
		console.log('Unable to connect to the location services!')
	}
	else if(response.body.features.length == 0){
		console.log('Unable to get the location details.Please enter a valid location!')
	}
	else{
		console.log('Latitude: '+response.body.features[0].center[1])
		console.log('Longitude: '+response.body.features[0].center[0])
	}
})

const url = 'http://api.weatherstack.com/current?access_key=a286ee6768afcac9f6b211d5eb60147a&query=37.8267,-122.4233&units=s'

request({ url: url,json : true},(error,response) => {
	if(error){
	console.log('Unable to connect to the weather service!')
	}
	else if(response.body.error){
	console.log('Unable to find the location!')
}
	else {
	const temperature = response.body.current.temperature
	const feelslike_temperature = response.body.current.feelslike
	console.log(response.body.current.weather_descriptions[0] + ' . It is '+temperature+' degrees outside.It feels like '+feelslike_temperature+' degrees out.')

	}
	//console.log(response.body.current) //'response.body' is no longer a string..it is now  a parsed object
	
	//console.log(response)
	//const data = JSON.parse(response.body)
	//console.log(data.current)
})
*/















/*
console.log('Starting')

//we will use here the basic asynchronous function that node provides - setTimeout()
//setTimeout() - allows us to run some code after a specific amount of time has passed . It takes 2 required arguments - function and number of milliseconds you want to wait before the callback gets executed

setTimeout(() => {
	console.log('2 seconds timer')
},2000)


setTimeout(() => {
        console.log('0 second timer')
},0)



console.log('Stopping'))*/
