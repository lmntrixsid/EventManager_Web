import React from "react";
import ShowMoreText from "react-show-more-text";
import { IoIosArrowDown } from 'react-icons/io';
// import Modal from 'react-modal';
import { useState } from "react";
// import { Button } from "react-bootstrap";
// import Modal from "react-modal";
import { Modal, Button } from 'react-bootstrap';
import Map from './venueMap';


function getvenueName(venueDetails) {
  try {
    console.log(venueDetails?.name);
    return venueDetails?.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getAdressLine(venueDetails) {
  try {
    const address = venueDetails?.address?.line1 || "";
    const city = venueDetails?.city?.name || "";
    const state = venueDetails?.state?.stateCode || "";
    return `${address}, ${city}, ${state}`;
  } catch (error) {
    console.error(error);
    return "";
  }
}

function getOpenHours(venueDetails) {
  try {
    return venueDetails?.boxOfficeInfo?.openHoursDetail || "";
  } catch (error) {
    console.error(error);
    return "";
  }
}

function getGeneralRule(venueDetails) {
  try {
    return venueDetails?.generalInfo?.generalRule || "";
  } catch (error) {
    console.error(error);
    return "";
  }
}

function getchildRule(venueDetails) {
  try {
    return venueDetails?.generalInfo?.childRule || "";
  } catch (error) {
    console.error(error);
    return "";
  }
}

function getPhoneNumber(venueDetails) {
  try {
    return venueDetails?.boxOfficeInfo?.phoneNumberDetail || "";
  } catch (error) {
    console.error(error);
    return "";
  }
}

function VenueTab(props) {
    const { venueDetails } = props;
    console.log("Shanay")
    console.log(venueDetails?.location?.latitude)
    const [showMapModal, setShowMapModal] = useState(false);

    const handleMapClose = () => setShowMapModal(false);
    const handleMapShow = () => setShowMapModal(true);
    const VenueMap = () => (
        <Map center={{"lat": Number(venueDetails?.location?.latitude), "lng": Number(venueDetails?.location?.longitude)}}></Map>    
    );
   
  
    return (
        <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 text-center" style={{ marginTop: "20px" }}>
          {venueDetails.name && (
          <div className="d-flex flex-column mb-4">
            <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
              Name:
            </div>
            <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>{getvenueName(venueDetails)}</div>
          </div>)}
          {venueDetails.address && (
          <div className="d-flex flex-column mb-4">
            <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
              Address:
            </div>
            <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>{getAdressLine(venueDetails)}</div>
          </div>
            )}
            {venueDetails.phone && ( 
          <div className="d-flex flex-column mb-4">
            <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
              Phone Number:
            </div>
            <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>{getPhoneNumber(venueDetails)}</div>
          </div>
            )}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 text-center" style={{ marginTop: "20px" }}>
            {venueDetails.openHours && (
            <div className="d-flex flex-column mb-3">
                <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
                Open Hours:
                </div>
                <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>
                <ShowMoreText lines={2} more={<a href="#" style={{ textDecoration: 'underline' ,display: 'block'}}>Show more <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} less={<a href="#" style={{textDecoration: 'underline',display: 'block'}}>Show less <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} anchorClass="" expanded={false}>
                    {getOpenHours(venueDetails)}
                </ShowMoreText>
                </div>
            </div>
            )}
            {venueDetails.generalRule && (
            <div className="d-flex flex-column mb-3">
                <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
                General Rule:
                </div>
                <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>
                <ShowMoreText lines={2} more={<a href="#" style={{textDecoration: 'underline',display: 'block'}}>Show more <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} less={<a href="#" style={{textDecoration: 'underline',display: 'block'}}>Show less <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} anchorClass="" expanded={false}>
                    {getGeneralRule(venueDetails)}
                </ShowMoreText>
                </div>
            </div>
            )}
            {venueDetails.childRule && (
            <div className="d-flex flex-column mb-3">
                <div style={{ color: "#0cf0e5", fontSize: "1rem", textAlign: "center", fontWeight: "bold" }}>
                Child Rule:
                </div>
                <div style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>
                <ShowMoreText lines={2} more={<a href="#" style={{textDecoration: 'underline',display: 'block'}}>Show more <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} less={<a href="#" style={{ textDecoration: 'underline',display: 'block'}}>Show less <IoIosArrowDown style={{color: 'white', display: 'inline-block', verticalAlign: 'middle'}} /></a>} anchorClass="" expanded={false}>
                    {getchildRule(venueDetails)}
                </ShowMoreText>
                </div>
            </div>
            )}
        </div>

       </div>
       <div className="d-flex flex-column justify-content-center align-items-center mb-4">
       <Button variant="danger" className="me-4" onClick={handleMapShow} style={{ width: "300px", height: "40px", marginBottom:"10px" }}>
                Show venue on Google map
         </Button>
        </div>

        {/* <Modal isOpen={showMapModal} onRequestClose={handleMapClose} style={{ overlay: { zIndex: 9999 } }}>
        <h2>Event Venue</h2>
        <VenueMap/>
        <Button variant="secondary" onClick={()=>handleMapClose}>Close</Button>
      </Modal> */}

        <Modal show={showMapModal} onHide={ handleMapClose}>
                <Modal.Header>
                  <Modal.Title>Event Venue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VenueMap/>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "flex-start"}}>
                  <Button variant="dark" onClick={ handleMapClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>



    </div>


    

    );  
  };
  
  export default VenueTab;
  