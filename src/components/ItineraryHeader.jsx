import React from 'react';
import travelIcons from '../assets/travel_icons.png';

const ItineraryHeader = ({ formData }) => {
  const calculateTripDuration = () => {
    const { departure, arrival } = formData;
    if (departure && arrival) {
      const departureDate = new Date(departure);
      const arrivalDate = new Date(arrival);
      const timeDiff = arrivalDate - departureDate;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const nights = days - 1;
      return `${days} Days ${nights} Nights`;
    }
    return "Duration not specified";
  };

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <div 
        className="bg-gradient-custom text-white rounded-3xl p-8 text-center relative overflow-hidden"
        style={{ borderRadius: '24px' }}
      >
        {/* Main Content */}
        <div className="relative z-10">
          <h1 className="text-2xl font-medium mb-2">
            Hi, {formData?.travelerName || 'Traveler'}!
          </h1>
          
          <h2 className="text-3xl font-bold mb-3">
            {formData?.title || 'Travel Itinerary'}
          </h2>
          
          <p className="text-xl font-medium mb-6">
            {calculateTripDuration()}
          </p>
          
          {/* Travel Icons */}
          <div className="flex justify-center items-center gap-4">
            <img 
              src={travelIcons}
              alt="Travel Icons"
              className="h-8"
              style={{ filter: 'brightness(0) invert(1)' }} // Makes icons white
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryHeader;