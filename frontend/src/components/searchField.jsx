import React, { Component, useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Keyword_autocomplete from './autoComplete.jsx';


class SearchField extends Component {
    
    state = {
        
        formType: 2,
        
        keyword: "",
        category: "empty",
        distance: 10,
        longitude: 0,
        latitude: 0,
        location: "",
        autoDet: false,
        gmapsKey: 'AIzaSyALxBFMrFysSQnlwbcLtcrojQNFKUGiLiI',
        options: [],
        resize: false,
        loading: false
    }

    constructor() {
        super()
        this.state= {
            autoDet: false,
            formType: 2,
        
        keyword: "",
        category: "empty",
        distance: 10,
        longitude: 0,
        latitude: 0,
        location: "",
        autoDet: false,
        gmapsKey: 'AIzaSyALxBFMrFysSQnlwbcLtcrojQNFKUGiLiI',
        options: [],
        resize: false,
        loading: false
        }
    }


    getLocation = async(loc) => {
        var location={lat:0,long:0};
        console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${this.state.gmapsKey}`);
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${this.state.gmapsKey}`)
        .then((response) => response.json())
        .then((data) =>
            {
                var dataCheck = data
                console.log(dataCheck)
                if(dataCheck.status === "OK")
                {
                    var locationGmap = data.results[0].geometry.location
                    console.log(locationGmap)
                    location.lat = locationGmap.lat
                    location.long = locationGmap.lng
                    return 0
                }
                else
                {
                    alert("The location entered is not valid, try again")
                    this.handleClear()
                    return -1
                }

            })
        return location;
    }


    getIPInfo = async() =>{
        var location;
        await fetch('https://ipinfo.io/?token=6242d3f8b6bfa2')
        .then(res => res.json())
        .then(data =>
        {
            console.log('Response', data)
            var locationAuto = data.loc
            console.log("locationAuto = " + locationAuto)

            var split = locationAuto.indexOf(",")
            var lat = locationAuto.substring(0,split)
            var long = locationAuto.substring(split+1,locationAuto.length)

            location = {lat: lat, long: long}

        })
        return location;
    }


    getAutoComplete = async() => {

        this.setState({loading : true}, async () => {

            let optionOut = []

            var optionsCheck = await fetch(`http://localhost:3000/suggest?keyword=${this.state.keyword}`)
            .then((response) => response.json())
            .then((data) => {
                
                for( let x = 0; x < data._embedded.attractions.length; x++)
                {
                    optionOut.push({text: data._embedded.attractions[x].name})
                }

                console.log("list " , optionOut)
                // this.setState({options : data.terms, loading: false})
                this.setState({options : optionOut, loading: false})
            })

        })

    }


    handleSubmit = async (event) => {
        
        event.preventDefault()

        console.log("Submited");
        var eventList = null

        this.handleLocation()
        this.handleCategory()
        this.handleDistance()

        var location;

        // Get google map location
        if(this.state.autoDet === false)
        {
            var location = document.getElementById('location')
            console.log(location.value)
            location = await this.getLocation(location.value)
            if(location === -1)
            {
                console.log("Could not get the Gmap location")
                return
            }
            console.log()
        }
        
        // Get ipInfo location
        else{
            location = await this.getIPInfo()
        }
        if(location===-1) return;
        console.log(`http://localhost:3000/event-search?keyword=${this.state.keyword}&radius=${this.state.distance}&long=${location.long}&lat=${location.lat}&category=${this.state.category}`)
           var listCheck = await fetch(`http://localhost:3000/event-search?keyword=${this.state.keyword}&radius=${this.state.distance}&long=${location.long}&lat=${location.lat}&category=${this.state.category}`)
        // var listCheck = await fetch(`/searchBusiness?term=${this.state.keyword}&longitude=$
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.businesses)
            if(data.page.totalElements===0) eventList = [];
            else
            eventList = data._embedded.events;
        })

        console.log("here",eventList)
        this.props.updateEventList(eventList)

    };  

    handleClear = () => {

        console.log("cleared");
        document.getElementById("searchForm").reset();
        this.setState({category : "all", keyword: "", options: []})
        this.setState({autoDet: false})
        this.props.updateEventList(null)
        document.getElementById('location').disabled = false
        this.props.updateEventDetails([])
        this.props.showTable()

    };

    handleAutoDet = (event) => {

        
        if(event.target.checked === true)
        {
            console.log("autoDet - checked");
            
            document.getElementById('location').disabled = true
            document.getElementById('location').value = ""  
            this.setState({autoDet : true})
        }

        else
        {
            console.log("autoDet - unchecked");
            
            document.getElementById('location').disabled = false
            this.setState({autoDet : false})
        }

    };


    handleCategory = (event) => {

        console.log(document.getElementById("category").value)
        this.setState({category : document.getElementById("category").value})

    };


    handleKeyword = (value) => {
        console.log(value);
        this.setState({keyword : value})
    };


    handleDistance = (event) => {
        console.log(document.getElementById("distance").value)
        this.setState({distance : (document.getElementById("distance").value)})
    };

    handleLocation = (event) => {
        this.setState({location : (document.getElementById("location").value)})
    };
    
    updateDimensions = () => {
        this.setState({resized : window.screen.width})
    }

    componentDidMount = function() {
        window.addEventListener("resize", this.updateDimensions);
    };

    componentWillUnmount = function() {
        window.removeEventListener("resize", this.updateDimensions);
    };
    
    render() {
        
        return(
            <div id = "container m-1 seachFormDiv" className = {window.screen.width > 600 ? "container p-3 pt-5 pb-5 " : "container p-3 pt-4 " }
            style={{
                backgroundColor:"rgba(255, 255, 255, 0.2)",
                // margin:"auto",
                backdropFilter: "blur(5px)",
                padding:"20px",
                maxWidth: "650px"
                
            }}>

                <div className='text-center pb-2 pt-1 ' id='heading1'>
                    {/* style={{fontSize:"30px", fontWeight:"bold", color:"white"}} */}
                    
                    <h4 style={{fontSize: '40px', color: 'white' }}>Events Search</h4>
                    <hr></hr>
                    
                </div>
                

                <Form id = "searchForm" onSubmit={this.handleSubmit}>

                    
                <div className='row'>
                    <Form.Group className="mb-3 ">
                        <Form.Label style={{color: 'rgb(130,180,200)'}}>Keyword <span className='text-danger'>*</span></Form.Label>
                        {<Keyword_autocomplete getAutoComplete = {this.getAutoComplete} options = {this.state.options} loading = {this.state.loading} handleKeyword = {this.handleKeyword} keyword = {this.state.keyword}/>}
                    </Form.Group>
                    </div>


                    <div className='row'>

                        <div className='col-12 col-md-6 mb-md-2'>
                        <Form.Group className="mb-3">
                            <Form.Label style={{color: 'rgb(130,180,200)'}}>Distance</Form.Label>
                            <Form.Control type="number" id = "distance" defaultValue={10} max="1000" min="1"/>
                        </Form.Group>
                        </div>

                        <div className='col-12 col-md-5 mb-md-3'>
                            <Form.Label style={{color: 'rgb(130,180,200)'}}>Category <span className='text-danger'>*</span></Form.Label>
                            <select className="form-select custom-select " id = "category"   >
                                <option value="empty" >Default</option>
                                <option value="KZFzniwnSyZfZ7v7nJ">Music</option>
                                <option value="KZFzniwnSyZfZ7v7nE">Sports</option>
                                <option value="KZFzniwnSyZfZ7v7na">Arts & Theatre</option>
                                <option value="KZFzniwnSyZfZ7v7nn">Film</option>
                                <option value="KZFzniwnSyZfZ7v7n1">Miscellaneous</option>
                        </select>
                        </div>

                    </div>

                    <div className='row'>
                    <Form.Group className="mb-3">
                        <Form.Label style={{color: 'rgb(130,180,200)'}}>Location <span className='text-danger'>*</span></Form.Label>
                        <Form.Control disabled={this.state.autoDet} type="text" id = "location" required/>
                    </Form.Group>
                    </div>

                    <div className='row'>
                        <div className="form-check ms-3 mb-3">
                            <input id = "autoDetect" className="form-check-input" type="checkbox" value="Auto Detect" onClick={this.handleAutoDet} />
                            <label className="form-check-label text-white">Auto-detect my location</label>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-danger me-4">Submit</button>
                            <button type="button" className="btn btn-primary me-4" onClick={this.handleClear} style={{ width: "80px" }}>Clear</button>
                        </div>
                    </div>

                </Form>
            </div>
        ); 
        
        
        
    }
}
 
export default SearchField;