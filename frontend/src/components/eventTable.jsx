import React, { Component } from 'react';


class EventTable extends Component {

    state = {

        eventList:this.props.eventList,
        eventDetails:[],
        images:[],
    }


geteventDetails = async (id) => {   
    console.log(id);
    console.log("get events")
    try {
        const response = await fetch(`http://localhost:3000/event-details?event_id=${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch event details.");
        }
        const data = await response.json();
        console.log("hello")
        console.log(data);
        this.props.updateEventDetails(data); // pass the data to the parent component's updateEventDetails function
        this.props.hideTable();

    } catch (error) {
        console.error(error);
    }
};


render() {

    if(this.props.eventList !== null)
    {
       console.log(this.props.eventList); 
        if(this.props.eventList.length !== 0 && this.props.table === true)
        {   
            const sortedEventList = [...this.props.eventList].sort((a, b) => {
                const aDate = a.dates.start.hasOwnProperty('localTime') ? 
                    new Date(`${a.dates.start.localDate}T${a.dates.start.localTime}`) :
                    new Date(`${a.dates.start.localDate}T00:00:00`);
                const bDate = b.dates.start.hasOwnProperty('localTime') ? 
                    new Date(`${b.dates.start.localDate}T${b.dates.start.localTime}`) :
                    new Date(`${b.dates.start.localDate}T00:00:00`);
                return aDate - bDate;
            });
            
            return(
        
                <div className='container my-5' id='eventsTableID' >
                    <div class="row mx-auto">
                    <table  variant="dark" className='table table-striped table-dark text-center responsive' 
                    onLoad={() => document.getElementById('eventsTableID')}
                    style={{
                        
                        
                        backgroundColor: "black",
                        
                        overflow: "hidden",
                        borderRadius: "20px",
                        
                    }
                    }>
                        <thead>
                            <tr>
                                <th style={{ width: '150px' }}>Date</th>
                                <th>Icon</th>
                                <th>Event</th>
                                <th>Genre</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedEventList.map(
                                    (item) => <tr key = {item.id}>
                                        <td><b>{item.dates.start.hasOwnProperty('localTime') ? 
                                     <div>
                                                {item['dates']['start']['localDate']}<br />
                                                {item['dates']['start']['localTime']}
                                            </div>
                                            :
                                            <div>
                                                {item['dates']['start']['localDate']}
                                            </div>
                                        }</b></td>
                                        <td> <img src = {item.images[0].url} className = 'tableImgSize' />  </td>
                                        <td style={{ cursor: 'pointer' }} onClick={() => this.geteventDetails(item.id)}>{item.name}</td>
                                        <td> {item.classifications[0].segment.name} </td>
                                        <td> {item._embedded.venues[0].name} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>  
            );
        }

        else if(this.props.eventList.length === 0 && this.props.table === true)
        {   
            return(

                <div className='container text-center text-danger mt-5' style={{
                    backgroundColor:"white",
                    borderRadius: "20px",
                    width:"50%"
                
                
                }}>
                    <h5>No results available</h5>
                </div>
            );

        }

        else
        {
            return(
                <>
                </>
            );  
        }

    }

    else if(this.props.eventList === null)
    {
        return(
            <>
            </>
        );  
    }

};
}
export default EventTable;

