import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import React from 'react';

const ShareEvent = ({ eventDetails }) => {
    
    const shareOnTwitter = () => {
      const shareUrl = 'https://twitter.com/intent/tweet';
      const params = new URLSearchParams({
        url: eventDetails.url, // access the event URL from the eventDetails object
        text: 'Check out this cool event!',
      });
      window.open(`${shareUrl}?${params}`, '_blank');
    };
  
    const shareOnFacebook = () => {
      const shareUrl = 'https://www.facebook.com/sharer/sharer.php';
      const params = new URLSearchParams({
        u: eventDetails.url, // access the event URL from the eventDetails object
      });
      window.open(`${shareUrl}?${params}`, '_blank');
    };
  
    return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft:"360px",marginTop:"-25px" }}>
        <p style={{ fontSize: '20px', marginRight: '10px', color: 'white',marginTop:"10px" }}>Share on:</p>
        <AiOutlineTwitter onClick={shareOnTwitter} style={{ fontSize: '40px', marginRight: '10px', color: '#1DA1F2' }} />
        <AiFillFacebook onClick={shareOnFacebook} style={{ fontSize: '40px', color: '#3b5998' }} />
    </div>

        
    );
  };

export default ShareEvent;
  