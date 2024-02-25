import { padding } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function getArtistName(eventDetails){
    {
        try {
          let artistNames = [];
          let artists = eventDetails?._embedded?.attractions || [];
          
          for (let i = 0; i < artists.length; i++) {
            artistNames.push(artists[i].name);
          }
          if (artistNames.length > 0) {
            return artistNames;
          } else {
            return "";
          }
        } catch (error) {
          console.error(error);
          return "";
        }
      }
}




const ArtistTab = ({ eventDetails }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const attractionName = getArtistName(eventDetails);
        if (attractionName) {
          const artistNames = attractionName;
          const artists = [];
          const albums = [];
          for (const name of artistNames) {
            const response = await fetch(`http://localhost:3000/search-artist?keyword=${encodeURIComponent(name)}`);
            const data = await response.json();
            artists.push(data);
            
            const responseAlbum = await fetch(`http://localhost:3000/artist-albums/${data.id}`);
            const data2 = await responseAlbum.json();
            albums.push(data2);
          };
          setArtists(artists);
          setAlbums(albums);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtists();
  }, [eventDetails.id]);

  
  const renderArtistDetails = (artist) => (
  
 
    <div className="row align-items-center mb-3">
        <div className="row">
  <div className="d-flex flex-column col-12 col-md-3 d-flex justify-content-center align-items-center">
    
      <div className="mb-3">
        <div className="rounded-circle overflow-hidden" style={{width: "150px", height: "150px" }}>
          <img src={artist.images[0].url} alt={artist.name} className="img-fluid" />
        </div>
        <h4 style={{color: "#0cf0e5", fontSize:"22px", textAlign: "center"}}>{artist.name}</h4>
      </div>
      </div>
      {/* <div className="mb-2">
        <h4 style={{color: "#008080", fontSize:"5px"}}>{artist.name}</h4>
      </div> */}
      <div className="d-flex flex-column col-12 col-md-3 justify-content-center align-items-center mb-2">
        
          <div style={{color: "#0cf0e5", fontWeight: "bold", textAlign: "center"}}>Popularity:</div>
          
          <div style={{width:"50px",height:"50px"}}>
            <CircularProgressbar value={artist.popularity} text={`${artist.popularity}%`} styles={{path: {stroke: '#ff4d4d'}, text: {fill: '#ff4d4d'}, width:"20px",height:"20px"}} />
          </div>
        
      </div>
      <div className="d-flex flex-column col-12 col-md-3 justify-content-center align-items-center mb-2 pb-4">
        
          <div style={{color: "#0cf0e5", fontWeight: "bold", textAlign: "center", fontSize: "17px"}} className="pb-1">Followers:</div>
          <div className="text-center" style={{color:"white"}}>{Number(artist.followers.total).toLocaleString('en-US')}</div>
        
      </div>
      <div className='d-flex flex-column col-12 col-md-3 justify-content-center align-items-center pb-2'>
      <div style={{color: "#0cf0e5", fontWeight: "bold", textAlign: "center"}} className="pb-1">Spotify Link:</div>
        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-teal">
        <span class="d-inline-block align-middle">
        <i class="bi bi-spotify me-1 text-green" style={{fontSize:"2em" ,color:"green"}}></i>
        </span>
          
        </a>
      </div>
    
  </div>
  <div style={{color: "#0cf0e5", fontWeight: "bold", textAlign: "left"}} className="pb-1">Album Featuring </div>
  <div className="row justify-content-center align-items-center">
    {/* <div className="w-100 d-flex album-col justify-content-center align-items-center p-5"> */}
      {albums[currentArtistIndex].map((album, index) => (
        <div className="p-1 col-12 col-md-4 text-center" key={index}>
          <img src={album.images[0].url} alt={album.name} className="img-fluid rounded-3 w-75 h-75" />
        </div>
      ))}
    {/* </div> */}
  </div>
  </div>


  );

  return (
    <div>
  {artists.length > 0 ? (
    <Carousel 
      activeIndex={currentArtistIndex}
      onSelect={(index) => setCurrentArtistIndex(index)}
      interval={null}
      border={0}
      indicators={false}
      className="carousel"
    >
      {artists.map((artist, index) => (
        <Carousel.Item key={index} style={{border: "none"}} className={'artist-card'}>
          {renderArtistDetails(artist)}
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '50%', margin: '0 auto', textAlign: 'center' }}>
     <p style={{ color: 'red', fontSize: '20px', fontWeight:"bold" }}>Sorry, no music artists found for this event</p>
    </div>
  )}
</div>
  );
};
    

export default ArtistTab;

  