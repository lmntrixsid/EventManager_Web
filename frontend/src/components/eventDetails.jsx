import React, { Component } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { color } from '@mui/system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import EventsTab from "./eventsTab";
import ArtistTab from "./artistTab";
import VenueTab from './venueTab';
import { IoMdHeart } from 'react-icons/io';
import EventShare from './shareOn';
import {IoMdHeartEmpty} from 'react-icons/io';




class EventDetails extends Component {

    state = {
        // eventDetails : null,
        resized : 0,
        venueDetails : [],
    }
    getvenueDetails = async (keyword) => {
        try{
            const response = await fetch(`http://localhost:3000/venue-details?event_venue_name=${keyword}`);
            const data = await response.json();
            console.log("venue details", data._embedded.venues[0]);
            this.setState({venueDetails : data._embedded.venues[0]});
        }
        catch(error){
            console.error(error);
        }
    };
    handleBack = () => {
        this.props.showTable()
        console.log("back clicked")
    };

    updateDimensions = () => {
        this.setState({resized : window.screen.width})
    }
    componentDidMount = function() {
        window.addEventListener("resize", this.updateDimensions);
        
        if (this.props.eventDetails!==null  && this.props.table !== true){
            
        const favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents")) || [];
        const eventIndex = favoriteEvents.findIndex(e => e.name === this.props.eventDetails.name);
        
        if (eventIndex !== -1) {
            
        document.querySelector(".favorite-icon").classList.add("fas");
        document.querySelector(".favorite-icon").classList.remove("far");}}
    };

    componentDidUpdate = function() {
        
    if (this.props.eventDetails!==null  && this.props.table !== true){
        
    const favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents")) || [];
    const eventIndex = favoriteEvents.findIndex(e => e.name === this.props.eventDetails.name);
    
    if (eventIndex !== -1) {
        
    document.querySelector(".favorite-icon").classList.add("fas");
    document.querySelector(".favorite-icon").classList.remove("far");}}
    }

    componentWillUnmount = function() {
        window.removeEventListener("resize", this.updateDimensions);
    };
    getGenre(eventDetails) {
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
            if (temp && temp !== "Undefined" && temp !== "undefined") {
              if (val !== "") {
                val += " | " + temp;
              } else {
                val = temp;
              }
            }
          }
          return val || "";
        } catch (error) {
          console.error(error);
          return "";
        }
      }

    render() {
        const isFavorite = true;
         
        if (this.props.eventDetails!=null  && this.props.table !== true)

        {
            return( 
                
                <div className = {window.screen.width > 600 ? 'container my-5 p-0' : 'container my-5 p-0 w-75'} 
                onLoad={() => document.getElementById('eventDetailsDiv').scrollIntoView()} id='eventDetailsDiv' style={{
                    backgroundColor:"rgba(255, 255, 255, 0.2)",
                    // margin:"auto",
                    backdropFilter: "blur(5px)",
                    padding:"20px",
                    width: "55%",
                    paddingTop:"20px",
                    marginTop:"20px",
                    
                    
                   
                    
                }}>
                        <div className='d-flex justify-content-right align-items-center'style={{ marginBottom: '75px' }}>
                            <i className='bi bi-chevron-left ms-3 mr-3' style={{ fontSize: '18px', color : 'white' }} onClick={() => this.handleBack()}></i>
                            <span style={{ textDecoration: 'underline', color: 'white', fontSize: '18px' }} onClick={() => this.handleBack()}>Back</span>
                        </div>
                            <div className="d-flex justify-content-center mb-3" >
                            <h3 style={{ marginBottom: '60px', color: 'white'} }  >
                                {this.props.eventDetails.name}
                                <span 
                                className="ms-3"
                                onClick={() => {
                                    const event = {
                                    datetime: this.props.eventDetails.dates.start.localDate,
                                    name: this.props.eventDetails.name,
                                    category: this.getGenre(this.props.eventDetails),
                                    venue: this.props.eventDetails._embedded.venues[0].name
                                    };
                                    const favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents")) || [];
                                    const eventIndex = favoriteEvents.findIndex(e => e.name === event.name);
                                    if (eventIndex === -1) {
                                    favoriteEvents.push(event);
                                    alert("Event Added to Favorites!");
                                    document.querySelector(".favorite-icon").classList.add("fas");
                                    document.querySelector(".favorite-icon").classList.remove("far");
                                    } else {
                                    favoriteEvents.splice(eventIndex, 1);
                                    alert("Removed from Favorites!");
                                    document.querySelector(".favorite-icon").classList.add("far");
                                    document.querySelector(".favorite-icon").classList.remove("fas");
                                    }
                                    localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
                                }}
                                >
                                    {
                                        isFavorite ? <IoMdHeart className="favorite-icon fa-heart"></IoMdHeart> : <IoMdHeartEmpty className="favorite-icon fa-heart-empty"></IoMdHeartEmpty>
                                    }
                                {/* <IoMdHeart className={`favorite-icon fa-heart${isFavorite ? "-empty" : ""}`}></IoMdHeart> */}
                                </span>
                            </h3>
                            </div>
                          
                            <Tabs
                                scrollButtons={true}
                                allowScrollButtonsMobile
                                centered={window.screen.width > 600 ? true : false}
                                variant={window.screen.width < 600 ? "scrollable" : "standard"}
                                style={{ bottom: "none" }}
                                >
                                <TabList
                                    className="d-flex justify-content-between tab-margin-left"
                                    style={{
                                    backgroundColor: "teal",
                                    marginBottom: "5px",
                                    borderColor: "transparent",
                                    padding: "15px",
                                    }}
                                >
                                    <Tab
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        border: "none",
                                        marginLeft: "215px",
                                        bottom: "none",
                                    }}
                                    
                                    selectedStyle={{ borderBottom: "2px solid violet" }}
                                    >
                                    Events
                                    </Tab>
                                    <Tab
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        border: "none",
                                        marginLeft: "-7px",
                                    }}
                                    selectedStyle={{ borderBottom: "2px solid violet" }}
                                    >
                                    Artist/Team
                                    </Tab>
                                    <Tab
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        border: "none",
                                        marginRight: "235px",
                                    }}
                                    selectedStyle={{ borderBottom: "2px solid violet" }}
                                   
                                    onClick={() => this.getvenueDetails(this.props.eventDetails._embedded?.venues[0]?.name )}
                                    >
                                    Venue
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                <EventsTab eventDetails={this.props.eventDetails}>
                                <EventShare eventDetails={this.props.eventDetails} />
                                </EventsTab>

                                </TabPanel>
                                <TabPanel>
                                    <ArtistTab eventDetails={this.props.eventDetails} />
                                </TabPanel>
                                <TabPanel>                                    
                                     <VenueTab venueDetails={this.state.venueDetails}>
        
                                    </VenueTab>
                              
                                </TabPanel>
                            </Tabs>
                            
                        



                </div>
            ); 
        }

        else
        {
            return(
                null
            );  
        }

    }
} 

export default EventDetails;
