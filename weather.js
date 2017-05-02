document.addEventListener("DOMContentLoaded", function(event) {
	var app = new Vue({
		el: "#app",
		data: {
			weather: {},
			today: {},
			forecast: {},
			images: { 
				Today: "",
				Sunny: "https://farm4.staticflickr.com/3270/2564986045_f1eda95a7d_z.jpg",
				"Mostly Sunny": "http://i.imgur.com/2JVUw5O.jpg",
				"Mostly Cloudy": "http://i.imgur.com/k3kgjjz.jpg",
				"Partly Cloudy": "http://i.imgur.com/jYoT07N.jpg",
				Breezy: "http://i.imgur.com/nwhnRsZ.jpg",
				Cloudy: "http://i.imgur.com/15TPDsg.png",
				Rain: "http://i.imgur.com/rr8CSRY.gif"
			},
			input_location: "",
			weatherLoaded: false
		},

		methods: {
			getWeather: function() {
				// this.input_location = location;

				var url = "https://query.yahooapis.com/v1/public/yql?q="
				var ymlQuery = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + this.input_location + '")'
				+ '&format=json';

				var fullRequest = encodeURI(url + ymlQuery);

				console.log(fullRequest);

				$.get(fullRequest, function(result) {
					this.weather = result;
					console.log(result);
					this.weatherLoaded = true;

					// setting forecast
					this.forecast = this.weather.query.results.channel.item.forecast;

					this.today = this.forecast.shift();

					weatherAdjective = this.today.text;
					this.images.today = this.images[weatherAdjective];
				}.bind(this));


			}
		}

		
	});
});


