$(function() {


	// # Song
	var UPDATE_SONG_INTERVAL = 30000;
	var LASTFM_API_KEY = 'b25d40b918b28f62b666c6561c6446c6';
	var LASTFM_USER = 'tamperefutucafe';
	var PLACEHOLDER_IMG = 'placeholder.jpg';

	var songFeedQuery = {
		format: 'json',
		user: LASTFM_USER,
		api_key: LASTFM_API_KEY,
		limit: 3,
		extended: 1
	};

	var songFeedUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&' + $.param(songFeedQuery);

	// DOM selectors
	var songName = $('#playing');
	var songCover = $('#cover');
	var bg = $('#bg');
	var lastSong;


	function getSong() {
		$.get(songFeedUrl, function(data) {
			lastSong = data.recenttracks.track[0];
			lastSongCover = _.find(lastSong.image, { size: 'extralarge'});
			updateSong(
				_.get(lastSong, 'artist.name'),
				lastSong.name,
				lastSongCover ? lastSongCover['#text'] : ''
			);
		});
	}

	function updateSong(artist, song, cover) {
		songName.html('<span class="artist">' + artist + ' &bull; </span>' + song); // song name
		songCover.attr('src', cover || PLACEHOLDER_IMG); // set song to cover art
		bg.css('background-image', 'url(' + cover + ')'); // set cover as background layer
	}

	getSong();
	setInterval(getSong, UPDATE_SONG_INTERVAL);


	// # Clock
	var TIME_FORMAT = 'HH:mm';
	var clock = $('#clock');
	var time;

	function setClock() {
		time = moment().format(TIME_FORMAT);
		clock.html(time);
	}

	setClock();
	setInterval(setClock, 20000);


	// # Weather
	var WEATHER_APP_ID = '488e49ee1ce983be59e69292af6c9dd4';
	var WEATHER_LOCATION = 'Tampere';
	var WEATHER_LOCATION_LAT = '61.501856';
	var WEATHER_LOCATION_LON = '23.762890';

	var weatherQuery = {
		units: 'metric',
		lang: 'en',
		// q: WEATHER_LOCATION,
		lat: WEATHER_LOCATION_LAT, // Tampella
		lon: WEATHER_LOCATION_LON, // Tampella
		APPID: WEATHER_APP_ID,
		cnt: 1
	};

	var corsUrl = 'https://cors-anywhere.herokuapp.com/';
	var weatherApiUrl = corsUrl + 'http://api.openweathermap.org/data/2.5/weather?' + $.param(weatherQuery);

	var iconMapping = {
		'01d': 'ion-ios-sunny-outline',
		'02d': 'ion-ios-partlysunny-outline',
		'03d': 'ion-ios-cloudy-outline',
		'04d': 'ion-ios-cloud-outline',
		'09d': 'ion-ios-rainy-outline',
		'10d': 'ion-ios-rainy-outline',
		'11d': 'ion-ios-thunderstorm-outline',
		'13d': 'ion-ios-snowy',
		'50d': 'ion-ios-cloudy-outline',
		'01n': 'ion-ios-moon-outline',
		'02n': 'ion-ios-cloudy-night-outline',
		'03n': 'ion-ios-cloudy-outline',
		'04n': 'ion-ios-cloudy-outline',
		'09n': 'ion-ios-rainy-outline',
		'10n': 'ion-ios-rainy-outline',
		'13n': 'ion-ios-thunderstorm-outline',
		'11n': 'ion-ios-snowy',
		'50n': 'ion-ios-cloudy-outline',
		'na':  'ion-android-sad'
	};

	// DOM selectors
	var wTemperature = $('#weather-temperature');
	var wIcon = $('#weather-icon');


	function getWeather() {
		$.get(weatherApiUrl, function(data) {
			var temperature = Math.round(_.get(data, ['main','temp'], 0) * 10) / 10;
			var iconCode = _.get(data, ['weather', 0, 'icon'], 'na');
			var icon = iconMapping[iconCode];

			updateWeather(temperature, icon);
		});
	};

	getWeather();
	setInterval(getWeather, 120000);

	function updateWeather(temperature, icon) {
		wTemperature.html(temperature + 'º'); // temperature
		wIcon.attr('class', icon); // temperature
	}

});