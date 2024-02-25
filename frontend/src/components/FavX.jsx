// import React, { Component } from 'react';


// class FavX extends Component {
  
//     constructor() {
//         super()
//         this.state = {
//             favouriteList: []
//         }
//     }

//     componentDidMount() {
//       const favourite =  localStorage.getItem('favoriteEvents') 
//       const favoriteList = JSON.parse(favourite)
//       if (favoriteList !== null) {
//       this.setState({favouriteList: favoriteList})
//       console.log("Hello", this.state.favouriteList)
//       }
//     }
//     render() {
//         if (this.state.favouriteList.length === 0) {
//             return (
//                 <div>
                
//                     <p>No favourite events to show</p>
//                 </div>
//             );
//         } else {
//             return (
//                 <div>
//                     <h1>My Favourites</h1>
//                     <ul>
//                         {this.state.favouriteList.map((event) => (
//                             <li key={event.id}>{event.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             );
//         }
//     }
// }
import React, { Component } from 'react';
import { GoTrashcan } from 'react-icons/go';

class FavX extends Component {
    constructor() {
        super()
        this.state = {
            favouriteList: []
        }
    }

    componentDidMount() {
        const favourite = localStorage.getItem('favoriteEvents');
        const favoriteList = JSON.parse(favourite);
        if (favoriteList !== null) {
            this.setState({ favouriteList: favoriteList });
        }
    }

    // handleRemoveFavorite = (id) => {
    //     const updatedFavoriteList = this.state.favouriteList.filter((event) => event.id !== id);
    //     localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavoriteList));
    //     this.setState({ favouriteList: updatedFavoriteList });
    //     alert('Removed from Favorites!');
    // }

    handleRemoveFavorite = (index) => {
        const { favouriteList } = this.state;
        const updatedFavoriteList = [...favouriteList];
        updatedFavoriteList.splice(index, 1);
        localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavoriteList));
        this.setState({ favouriteList: updatedFavoriteList });
        alert('Removed from Favorites!');
      }

    render() {
        const { favouriteList } = this.state;

        if (favouriteList.length === 0) {
            return (
                <div style={{ backgroundColor: 'white',borderRadius: '20px', width: '50%', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ color: 'red', fontSize: '20px', fontWeight:"bold" }}>No favorite events to show</p>
             </div>

            );
        } else {
            return (

            
                <div className='container my-5' id='favouriteTableEntry'>
                <table className='table table-hover  text-center table-responsive-sm' 
                onLoad={() => document.getElementById('favouriteTableEntry')}
                style={{  
                    backgroundColor: "white",
                    color: "black",
                    overflow: "hidden",
                    borderRadius: "20px",
                    width: "70%",
                    margin: "0 auto",}}
                
                >
                    <thead>
                        <tr>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>#</th>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>Date</th>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>Event</th>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>Category</th>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>Venue</th>
                            <th style={{ color: 'black', fontWeight: 'bold' }}>Favourite</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign: 'center'}}>
                        {favouriteList.map((event, index) => (
                            <tr key={event.id}>
                                <td style={{ fontWeight: 'bold',color:"black" }}>{index + 1}</td>
                                <td style={{ width: '20%', color:"black" }}>{event.datetime}</td>
                                <td style={{ width: '20%',color:"black" }} >{event.name}</td>
                                <td style={{ width: '30%',color:"black" }} >{event.category}</td>
                                <td style={{ width: '30%',color:"black" }} >{event.venue}</td>
                                <td>
                                <span 
                            onClick={() => this.handleRemoveFavorite(index)}
                            style={{ cursor: "pointer",color:"black" }}
                            >
                            <GoTrashcan size={20} />
                            </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            )
        }
    }
}

export default FavX;

// export default FavX;