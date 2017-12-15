//ws.audioscrobbler.com/2.0/?method=user.getTopTracks&format=json&user=tamperefutucafe&api_key=b25d40b918b28f62b666c6561c6446c6&limit=10&extended=1&period=1month

$(function() {
  // # Song
  var UPDATE_SONG_INTERVAL = 30000;
  var LASTFM_API_KEY = "b25d40b918b28f62b666c6561c6446c6";
  var LASTFM_USER = "tamperefutucafe";

  var songId = "f6491f93-5322-4750-bbca-cf438187e649";

  var songFeedQuery = {
    format: "json",
    user: LASTFM_USER,
    api_key: LASTFM_API_KEY,
    limit: 10,
    period: "1month"
  };

  var songFeedUrl =
    "https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&" +
    $.param(songFeedQuery);

  // DOM selectors
  var playCount = $("#playCount");
  var bg = $("#bg");
  var tracks, track;

  function getCount() {
    $.get(songFeedUrl, function(data) {
      tracks = data.toptracks.track;
      track = _.find(tracks, { mbid: songId });

      updateSong(
        _.get(track, "playcount"),
        _.get(_.find(track.image, { size: "extralarge" }), "#text")
      );
    });
  }

  function updateSong(count, cover) {
    playCount.html(count); // play Count
    bg.css("background-image", "url(" + cover + ")"); // set cover as background layer
  }

  getCount();
  setInterval(getCount, UPDATE_SONG_INTERVAL);
});
