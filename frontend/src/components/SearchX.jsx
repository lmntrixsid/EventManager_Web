
import React, { Component } from "react";
import SearchField from "./searchField";
import EventTable from "./eventTable";
import EventDetails from "./eventDetails";

class SearchX extends Component {
  state = {
    eventList: null,
    eventDetails: null,
    table: true,
  };

  showTable = () => {
    this.setState({ table: true });
  };

  hideTable = () => {
    this.setState({ table: false });
  };

  updateEventList = (data) => {
    // () => {} makes the bottom part asynch, as setState is asyn the code wont wait until that is executed
    this.setState({ eventList: data }, () => {
      console.log("received list and updated", this.state.eventList);
    });
  };

  updateEventDetails = (data) => {
    this.setState({ eventDetails: data }, () => {
      console.log("received details and updated", this.state.eventDetails);
    });
  };

  render() {
    return (
      <>
        <SearchField
          updateEventList={this.updateEventList}
          updateEventDetails={this.updateEventDetails}
          showTable={this.showTable}
        />
        <EventTable
          eventList={this.state.eventList}
          updateEventDetails={this.updateEventDetails}
          table={this.state.table}
          hideTable={this.hideTable}
        />
        <EventDetails
          eventDetails={this.state.eventDetails}
          table={this.state.table}
          showTable={this.showTable}
        />
      </>
    );
  }
}

export default SearchX;
