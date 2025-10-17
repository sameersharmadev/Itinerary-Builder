import React from 'react';

const TripOverview = ({ formData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <div 
        className="flex items-center justify-between p-4 px-8 bg-gray-50 rounded-full border"
        style={{ 
          borderRadius: '25px',
          border: '2px solid #541C9C',
          backgroundColor: '#FFF'
        }}
      >
        {/* Departure From */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Departure From :</span>
          <span className="text-sm text-gray-700">{formData?.departure_from || 'Not specified'}</span>
        </div>

        {/* Departure */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Departure :</span>
          <span className="text-sm text-gray-700">{formatDate(formData?.departure)}</span>
        </div>

        {/* Arrival */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Arrival :</span>
          <span className="text-sm text-gray-700">{formatDate(formData?.arrival)}</span>
        </div>

        {/* Destination */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Destination :</span>
          <span className="text-sm text-gray-700">{formData?.destination || 'Not specified'}</span>
        </div>

        {/* No. Of Travellers */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">No. Of Travellers :</span>
          <span className="text-sm text-gray-700">{formData?.travelers || 'Not specified'}</span>
        </div>
      </div>
    </div>
  );
};

export default TripOverview;