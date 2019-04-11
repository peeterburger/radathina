<template>
	<GridLayout rows="auto,auto">
		<StackLayout row="0">
			<Label class="bold" :text="city"></Label>
			<Label :text="summary"></Label>
			<Image class="weather-image" :src="image" />
			<GridLayout class="weather-box" columns="1*,1*" rows="auto">
				<Label col="0" row="0" class="large" :text="currentTemperature"></Label>
				<StackLayout col="1" row="0">
					<Label class="small bold" text="details"></Label>
					<StackLayout class="hr-light tight"></StackLayout>
					<Label class="small" :text="feuchtigkeit"></Label>
					<Label class="small" :text="wind"></Label>
					<Label class="small" :text="sichtweite"></Label>
				</StackLayout>
			</GridLayout>
		</StackLayout>
		<StackLayout row="1">
			<Label :text="day"></Label>
			<Label :text="time"></Label>
		</StackLayout>
	</GridLayout>
</template>

<script>
	const Geolocation = require("nativescript-geolocation");
	const Accuracy = require("ui/enums");
	const http = require("http");

	export default {
		data() {
			return {
				image: '',
				city: '',
				windSpeed: '',
				summary: '',
				visibility: '',
				humidity: '',
				currentTemperature: ''
			};
		},
		methods: {
			setImage(icon) {
				console.log(icon);
				if (icon.includes('rain') || icon.includes('thunderstorm') || icon.includes('drizzle')) {
					this.image = "~/images/rainy.png";
				} else if (icon.includes('clouds')) {
					this.image = "~/images/cloudy.png";
				} else if (icon.includes('snow') || icon.includes('sleet') || icon.includes('mist') || icon.includes(
						'drizzle') || icon.includes('haze')) {
					this.image = "~/images/foggy.png";
				} else if (icon.includes('clear')) {
					this.image = "~/images/sunny.png";
				}
			},
			getMyWeather() {
				Geolocation.enableLocationRequest();
				//handle, accept 'ok' push 
				Geolocation.getCurrentLocation({
						desiredAccuracy: Accuracy.high,
						updateDistance: 0.1,
						timeout: 20000
					})
					.then(loc => {
							if (loc) {
								/*note, for Celsius use 'units=metric' in the call*/
								http.request({
										url: "https://api.openweathermap.org/data/2.5/weather?APPID=8bf185093ca5de6f4578170a5d95b15d&units=metric&lat=" +
											loc.latitude + "&lon=" + loc.longitude + "",
										method: "GET"
									})
									.then(response => {
										var location = response.content.toJSON();
										this.city = location.name;
										this.summary = location.weather[0].main;
										this.icon = location.weather[0].description;
										this.setImage(this.icon);
										var weatherObj = JSON.stringify(location.main);
										var weather = JSON.parse(weatherObj);
										this.currentTemperature = Math.round(weather.temp).toString() + '°';
										this.feuchtigkeit = 'Feuchtigkeit: ' + weather.humidity.toString() + '%';
										var windObj = JSON.stringify(location.wind);
										var wind = JSON.parse(windObj);
										this.wind = 'Wind: ' + wind.speed.toString() + ' m/s';
										//convert meters to miles 
										var visibilityObj = Math.round(JSON.stringify(location.visibility) / 1000);
										this.sichtweite = 'Sichtweite: ' + visibilityObj.toString() + ' km';
									})
							}
						},
						function (e) {
							console.log("Error: " + e.message);
						});
			}
		},
		created() {
			this.getMyWeather()
			//date manipulations 
			var currentDate = new Date()
			var day = currentDate.getDay()
			var weekdays = new Array(7);
			weekdays[0] = "Sonntag";
			weekdays[1] = "Montag";
			weekdays[2] = "Dienstag";
			weekdays[3] = "Mittwoch";
			weekdays[4] = "Donnerstag";
			weekdays[5] = "Freitag";
			weekdays[6] = "Samstag";
			var dayName = weekdays[day];
			var currentHours = currentDate.getHours();
			console.log(currentHours);
			var timeOfDay = (currentHours >= 12) ? "Nachmittag" : "Vormittag";
			console.log(timeOfDay);
			this.day = dayName;
			this.time = timeOfDay;
		}
	}
</script>

<style scoped>
	Page {
		margin: 30;
	}

	label {
		margin: 10 0;
		font-family: "Quicksand";
		font-size: 20;
		text-transform: uppercase;
		text-align: center;
	}

	.bold {
		font-weight: bold;
	}

	.weather-image {
		margin: 10 50;
	}

	.weather-box {
		margin-top: 10;
	}

	.large {
		font-size: 60;
		vertical-align: top;
	}

	.small {
		font-size: 15;
		margin: 0;
		text-align: left;
	}

	.tight {
		margin: 5
	}
</style>