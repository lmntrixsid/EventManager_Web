
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchX from './components/SearchX';
import FavX from './components/FavX';
import NavBar from './components/navBar';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, {Component} from "react";



class App extends Component {

  state = {
    eventList : [],
    favouriteList : []
  }

  render(){
    return (
      <>
        <Router>
            <NavBar />
            <Routes>
                <Route path = "/" element={<Navigate replace to={"/search"} />} />
                <Route path="/search" element = {<SearchX eventList = {this.state.eventList} />} />
                <Route path="/favorites" element = {<FavX/>} />
            </Routes>

        </Router>
      </>
    );
  }
}

export default App;