import { FaLocationDot } from "react-icons/fa6";
import { format } from 'date-fns';
import './index.css'

function EventCard({ event }) {

    function getDirectImageLink(driveLink) {
        // Extract the file ID from the Google Drive link
        const fileId = getFileIdFromDriveLink(driveLink);
        
        // Construct the direct link to the image file
        const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
        
        return directLink;
    }
    
    function getFileIdFromDriveLink(driveLink) {
        // Example drive link format: https://drive.google.com/file/d/FILE_ID/view
        const regex = /\/file\/d\/([^/]+)\//;
        const match = driveLink.match(regex);
        
        if (match && match[1]) {
            return match[1];
        } else {
            // Handle invalid drive link format
            throw new Error('Invalid Google Drive link format');
        }
    }
    
    // Usage
    const directImageLink = getDirectImageLink(event.imgUrl);
    const formattedDate = format(event.date, 'MMM dd, yyyy');
    const km = Math.floor(event.distanceKm/100);
    
    return (
      <div className="event-card">
        <img
          src={directImageLink}
          alt={`Thumbnail for ${event.eventName}`}
          loading="lazy"
          className="event-image"
        />
        
            <div className="event-container">
                <div>
                    <h2 className="event-name">{event.eventName}</h2>
                    <div className="event-card-location">
                        <p><FaLocationDot /></p>
                        <p>{event.cityName}</p>
                    </div>
                </div>
                <div>
                    <p className="event-date">{formattedDate}</p>
                    <p className="event-date">{event.weather} | {km}km</p>
                </div>
            </div>
        </div>
      
    );
  }
  export default EventCard;