const express = require('express');
const cors = require('cors');
var geohash = require('ngeohash');
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors());

// API keys
const TICKETMASTER_API_KEY = 'oGFs3PCc5YTRA5JPp952i49O92aQ4EKR';

// app.get('/', (req, res) => {
//   res.sendFile('index.html', { root: __dirname });
// });

app.get('/event-search', (req, res) => {
  const lati = req.query.lat;
  const longi = req.query.long;
  const distance = req.query.radius;
  const category = req.query.category;
  const keyword = req.query.keyword;
  const geopoint = geohash.encode(lati, longi);


  // Get events in the location and category using Ticketmaster API
  let event_url;
  if (category === "empty") {
    event_url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=${keyword}&radius=${distance}&unit=miles&geoPoint=${geopoint}`;
  } else {
    event_url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=${keyword}&segmentId=${category}&radius=${distance}&unit=miles&geoPoint=${geopoint}`;
  }
  console.log(event_url);
  request.get(event_url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(JSON.parse(body));
  });
});

// 2nd API
app.get('/event-details', (req, res) => {
  const event_id = req.query.event_id;
  console.log(event_id);

  // Get events in the location and category using Ticketmaster API
  const event_url = `https://app.ticketmaster.com/discovery/v2/events/${event_id}?apikey=${TICKETMASTER_API_KEY}`;
  request.get(event_url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(JSON.parse(body));
  });
});

app.get('/venue-details', (req, res) => {
  const event_venue_name = req.query.event_venue_name;

  // Get events in the location and category using Ticketmaster API
  const event_url = `https://app.ticketmaster.com/discovery/v2/venues?apikey=${TICKETMASTER_API_KEY}&keyword=${event_venue_name}`;
  request.get(event_url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(JSON.parse(body));
  });
});

app.get('/suggest', (req, res) => {
  try {
    const keyword = req.query.keyword;
    const url = `https://app.ticketmaster.com/discovery/v2/suggest?apikey=${TICKETMASTER_API_KEY}&keyword=${keyword}`;
    request.get(url, (error, response, body) => {
      if (error) {
        return res.status(500).json({ message: error });
      }
     
      res.status(200).json(JSON.parse(body));
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


const spotifyApi = new SpotifyWebApi({
  clientId: '22886dce937840a49472d9f970df55a7',
  clientSecret: '73d5854061c945ff80ccc73cec0b6f68',
});

spotifyApi.clientCredentialsGrant()
  .then(data => {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future requests
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.error('Error getting access token:', error);
  });



// Route to search for an artist
// app.get('/search-artist', async (req, res) => {
//   const keyword = req.query.keyword; // get the search keyword from the query string
//   try {
//     const data = await spotifyApi.searchArtists(keyword); // search for the artist

//     res.json(data.body.artists); // return the artist data in JSON format
//   } catch (error) {
//     if (error.statusCode === 401) { // if token is not set up or expired, refresh token and try again
//       try {
//         const data = await spotifyApi.clientCredentialsGrant(); // refresh the token
//         spotifyApi.setAccessToken(data.body.access_token); // set the new access token
//         const data2 = await spotifyApi.searchArtists(keyword); // search for the artist again
        
//         res.json(data2.body.artists); // return the artist data in JSON format
//       } catch (error2) {
//         res.status(500).send('Error retrieving artist data'); // if error occurs, return 500 error
//       }
//     } else {
//       res.status(500).send('Error retrieving artist data'); // if error occurs, return 500 error
//     }
//   }
// });
app.get('/search-artist', async (req, res) => {
  const keyword = req.query.keyword; // get the search keyword from the query string
  try {
    const data = await spotifyApi.searchArtists(keyword); // search for the artist
    const artists = data.body.artists.items;
    
    var artist = null;
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].name.toLowerCase() === keyword.toLowerCase()) {
        artist = artists[i];
        break;
      }
    }
    // if (!artist) {
    //   artist = artists[0]; // if no exact match, return the first artist in the search results
    // }
    console.log(artist);
    res.status(200).send(artist); // return the artist data in JSON format
  } catch (error) {
    if (error.statusCode === 401) { // if token is not set up or expired, refresh token and try again
      try {
        const data = await spotifyApi.clientCredentialsGrant(); // refresh the token
        spotifyApi.setAccessToken(data.body.access_token); // set the new access token
        const data2 = await spotifyApi.searchArtists(keyword); // search for the artist again
        const artists = data2.body.artists.items;
        let artist = null;
        for (let i = 0; i < artists.length; i++) {
          if (artists[i].name.toLowerCase() === keyword.toLowerCase()) {
            artist = artists[i];
            break;
          }
        }
        // if (!artist) {
        //   artist = artists[0]; // if no exact match, return the first artist in the search results
        // }
        res.status(200).send(artists); // return the artist data in JSON format
      } catch (error2) {
        res.status(500).send('Error retrieving artist data'); // if error occurs, return 500 error
      }
    } else {
      res.status(500).send('Error retrieving artist data'); // if error occurs, return 500 error
    }
  }
});


// Route to get an artist's albums
app.get('/artist-albums/:artistId', async (req, res) => {
  const artistId = req.params.artistId; // get the artist ID from the URL parameter
  try {
    const data = await spotifyApi.getArtistAlbums(artistId, {limit:3}); // get the artist's albums
    res.json(data.body.items); // return the album data in JSON format
  } catch (error) {
    if (error.statusCode === 401) { // if token is not set up or expired, refresh token and try again
      try {
        const data = await spotifyApi.clientCredentialsGrant(); // refresh the token
        spotifyApi.setAccessToken(data.body.access_token); // set the new access token
        const data2 = await spotifyApi.getArtistAlbums(artistId, {limit:3}); // get the artist's albums again
        res.json(data2.body.items); // return the album data in JSON format
      } catch (error2) {
        res.status(500).send('Error retrieving album data'); // if error occurs, return 500 error
      }
    } else {
      res.status(500).send('Error retrieving album data'); // if error occurs, return 500 error
    }
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//1. Open API at backend to use library to get spotify json for artist and the album
//2. From frontend, use the API to get the json and display the artist and album
//3. Use the API to get the json and display the artist and album