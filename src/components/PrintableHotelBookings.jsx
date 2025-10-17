import React from 'react';

const PrintableHotelBookings = ({ hotels }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!hotels || hotels.length === 0) {
    return null;
  }

  // Calculate the height needed for each row based on hotel name content
  const getRowHeight = (hotel) => {
    const lines = hotel.hotelName.split('\n').length;
    // Base height + extra height for additional lines
    return Math.max(60, 32 + (lines * 20)); // minimum 60px, then 20px per line
  };

  const isLastRow = (index) => index === hotels.length - 1;

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Hotel <span style={{ color: '#9333EA' }}>Bookings</span>
      </h2>

      {/* Table with separate columns */}
      <div className="mb-6 flex gap-2">
        {/* City Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            City
          </div>
          <div>
            {hotels.map((hotel, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(hotel)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {hotel.city}
              </div>
            ))}
          </div>
        </div>

        {/* Check In Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Check In
          </div>
          <div>
            {hotels.map((hotel, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(hotel)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {formatDate(hotel.checkIn)}
              </div>
            ))}
          </div>
        </div>

        {/* Check Out Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Check Out
          </div>
          <div>
            {hotels.map((hotel, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(hotel)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {formatDate(hotel.checkOut)}
              </div>
            ))}
          </div>
        </div>

        {/* Nights Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Nights
          </div>
          <div>
            {hotels.map((hotel, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(hotel)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {hotel.nights}
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Name Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Hotel Name
          </div>
          <div>
            {hotels.map((hotel, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(hotel)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                <div className="flex flex-col items-center">
                  {hotel.hotelName.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="text-sm text-gray-800 space-y-1 mb-4">
        <p><strong>1.</strong> All Hotels Are Tentative And Can Be Replaced With Similar.</p>
        <p><strong>2.</strong> Breakfast Included For All Hotel Stays</p>
        <p><strong>3.</strong> All Hotels Will Be 4* And Above Category</p>
        <p><strong>4.</strong> A maximum occupancy of 2 people/room is allowed in most hotels.</p>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PrintableHotelBookings;