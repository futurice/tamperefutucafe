$(function() {
	var UPDATE_SONG_INTERVAL = 10000;
	var LASTFM_API_KEY = 'b25d40b918b28f62b666c6561c6446c6';
	var LASTFM_USER = 'tamperefutucafe';
	var PLACEHOLDER_IMG = 'https://www.instagram.com/p/BQiEYnAjhUl/media/?size=l';


	var songFeedQuery = {
		format: 'json',
		user: LASTFM_USER,
		api_key: LASTFM_API_KEY
	}

	var songFeedUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&' + $.param(songFeedQuery);
	var songName = $('#playing');
	var songCover = $('#cover');
	var bg = $('#bg');
	var lastSong;


	function getSong() {
		$.get(songFeedUrl, function(data) {
			lastSong = data.recenttracks.track[0];
			lastSongCover = _.find(lastSong.image, { size: 'extralarge'})
			updateSong(
				lastSong.artist['#text'],
				lastSong.name,
				lastSongCover ? lastSongCover['#text'] : ''
			);
		});
	}

	function updateSong(artist, song, cover) {
		songName.html(artist + ' &bull; ' + song); // song name
		songCover.attr('src', cover || PLACEHOLDER_IMG); // set song to cover art
		bg.css('background-image', 'url(' + cover + ')'); // set cover as background layer
	}

	getSong();
	setInterval(getSong, UPDATE_SONG_INTERVAL);


});