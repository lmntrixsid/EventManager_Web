import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Row, Col } from 'react-bootstrap';

function getDate(eventDetails) {
    try {
      let date = eventDetails.dates?.start?.localDate || "";
      let time = eventDetails.dates?.start?.localTime || "";
      return (
        <>
          <Typography variant="body1">{date}</Typography>
          <Typography variant="body1">{time}</Typography>
        </>
      );
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  function getArtist(eventDetails) {
    try {
      let artistNames = [];
      let artists = eventDetails._embedded?.attractions || [];
      for (let i = 0; i < artists.length; i++) {
        artistNames.push(artists[i].name);
      }
      if (artistNames.length > 0) {
        return artistNames.join(' | ');
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  
  
  function getVenue(eventDetails) {
    try {
      return (
        eventDetails._embedded?.venues[0]?.name || ""
      );
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  
  
  function getGenre(eventDetails) {
    try {
      let genreVals = ["subGenre", "genre", "segment", "subType", "type"];
      let val = "";
      for (let i = 0; i < genreVals.length; i++) {
        let temp = "";
        try {
          temp = eventDetails.classifications[0][genreVals[i]]?.name;
        } catch (err) {
          temp = "";
        };
        if (temp && temp !=="Undefined" && temp !=="undefined") {
          if (val !== "") {
            val += " | " + temp;
          } else {
            val = temp;
          }
        }
      }
      return val;
    } catch (error) {
      return "";
    }
  }
  
  
  function getPrice(eventDetails) {
    try {
      const minPrice = eventDetails.priceRanges?.[0]?.min;
      const maxPrice = eventDetails.priceRanges?.[0]?.max;
      const currency = eventDetails.priceRanges?.[0]?.currency || "USD";
      return minPrice && maxPrice
        ? `${minPrice} - ${maxPrice} ${currency}`
        : "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  
  function getTicketStatus(eventDetails) {
    try {
      const status = eventDetails.dates?.status?.code || "";
      let bgColor = "";
      let textColor = "#FFFFFF";
      let text = "";
      switch (status) {
        case "onsale":
          bgColor = "#4CAF50"; // Green
          text = "On Sale";
          break;
        case "offsale":
          bgColor = "#F44336"; // Red
          text = "Off Sale";
          break;
        case "cancelled":
          bgColor = "#000000"; // Black
          text = "Cancelled";
          break;
        case "postponed":
          bgColor = "#FF9800"; // Orange
          text = "Postponed";
          break;
        case "rescheduled":
          bgColor = "#FF9800"; // Orange
          text = "Rescheduled";
          break;
        default:
          break;
      }
      return {
        bgColor,
        textColor,
        text,
      };
    } catch (error) {
      console.error(error);
      return {
        bgColor: "",
        textColor: "",
        text: "",
      };
    }
  }
  


  function getEventUrl(eventDetails) {
    try {
      return eventDetails.url || "";
    } catch (error) {
      console.error(error);
      return "URL not available";
    }
  }

  function getVenueMap(eventDetails) {
    try {
      return eventDetails.seatmap?.staticUrl || "";
    } catch (error) {
      console.error(error);
      return "Venue map not available";
    }
  }
  
function EventsTab(props) {
    const { eventDetails } = props;
//    
return (
    // 
    <div style={{ marginBottom: '30px', marginTop:"30px" }}>
  <Row>
    <Col xs={12} md={6}>
      <div style={{ textAlign: 'center', borderBottom: 'none', marginBottom: '30px' }}>
        {eventDetails && (
          <>
            {getDate(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Date</h6>
                <p style={{ color: '#FFFFFF', marginBottom: '20px' }}>{getDate(eventDetails)}</p>
              </div>
            )}
            {getArtist(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Artist</h6>
                <p style={{ color: '#FFFFFF', marginBottom: '20px' }}>{getArtist(eventDetails)}</p>
              </div>
            )}
            {getVenue(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Venue</h6>
                <p style={{ color: '#FFFFFF', marginBottom: '20px' }}>{getVenue(eventDetails)}</p>
              </div>
            )}
            {getGenre(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Genre</h6>
                <p style={{ color: '#FFFFFF', marginBottom: '20px' }}>{getGenre(eventDetails)}</p>
              </div>
            )}
            {getPrice(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Price</h6>
                <p style={{ color: '#FFFFFF', marginBottom: '20px' }}>{getPrice(eventDetails)}</p>
              </div>
            )}
            {getTicketStatus(eventDetails) && (
              <div>
                <h6 style={{ color: '#0cf0e5', marginBottom: '10px', fontSize:"20px" }}>Ticket Status</h6>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    backgroundColor: getTicketStatus(eventDetails).bgColor,
                    color: getTicketStatus(eventDetails).textColor,
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px"
                  }}>
                    {getTicketStatus(eventDetails).text}
                  </div>
                </div>
              </div>
            )}
            {getEventUrl(eventDetails) && (
              <div>
                <h6 style={{ color: '#09e9d3', marginBottom: '10px' }}>By Ticket At:</h6>
                <div><a href={getEventUrl(eventDetails)}>Ticketmaster</a></div>
              </div>
            )}
          </>
        )}
      </div>
    </Col>
    <Col xs={12} md={6}>
  {getVenueMap(eventDetails) && (
    <div style={{ border: 'none', display:"block", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={getVenueMap(eventDetails)} alt="venue map" style={{ width: '100%', maxWidth: '600px', marginTop: '115px' }} />
    </div>
  )}
</Col>

  </Row>
</div>

  );
}

export default EventsTab;
