import { format } from 'date-fns';
import { FaLocationDot } from "react-icons/fa6";

import './index.css'

const Upcomming=(props)=>{
    const {data}=props
    const {imgUrl,date,eventName,cityName,weather,distanceKm}=data

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
    const directImageLink = getDirectImageLink(imgUrl);
    const formattedDate = format(date, 'MMM dd, yyyy');
    const km = Math.floor(distanceKm/100);


    return(
        <div className='card'>
            <img src={directImageLink}
             alt={`img-${eventName}`}
             loading='lazy'
             className='image'/>
             <p className='special'>{formattedDate}</p>
             <p>{eventName}</p>
             <div className='upcomming-bottom'>
                <div className='event-card-location'>
                <p><FaLocationDot /></p>
                <p>{cityName}</p>
                </div>
                <p className='upcomming-weather'>{weather}| {km} km</p>
             </div>
        </div>
    )
}
export default Upcomming;