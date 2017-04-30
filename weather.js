document.addEventListener("DOMContentLoaded", function(event) {
	var app = new Vue({
		el: "#app",
		data: {
			weather: "",
			location: "",
			input_location: ""
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
				}.bind(this));
			}
		}

		
	});
});


