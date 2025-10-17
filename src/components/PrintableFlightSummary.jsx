import React from 'react';

const PrintableFlightSummary = ({ flights }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' };
        return date.toLocaleDateString('en-US', options).replace(/,/g, ' ');
    };

    const getAirportCode = (city) => {
        const airportCodes = {
            'Delhi': 'DEL',
            'Mumbai': 'BOM',
            'Singapore': 'SIN',
            'Bangkok': 'BKK',
            'Dubai': 'DXB',
            'London': 'LHR',
            'New York': 'JFK',
            'Paris': 'CDG'
        };

        return airportCodes[city] || city.substring(0, 3).toUpperCase();
    };

    if (!flights || flights.length === 0) {
        return null;
    }

    return (
        <div className="w-full mb-8 print:break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
                Flight <span style={{ color: '#9333EA' }}>Summary</span>
            </h2>

            {/* Flight Items */}
            <div className="space-y-3 mb-6">
                {flights.map((flight, index) => (
                    <div key={index} className="flex items-center" style={{ border: '1px solid #541C9C', borderRadius: '8px' }}>
                        <div
                            className="relative px-6 py-2 text-center font-semibold text-sm flex items-center justify-center"
                            style={{
                                background: '#F9EEFF',
                                color: '#541C9C',
                                minWidth: '140px',
                                height: '48px',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                            }}
                        >
                            {formatDate(flight.date)}
                            <div
                                className="absolute right-0 top-0 h-full w-4"
                                style={{
                                    background: '#F9EEFF',
                                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                                    transform: 'translateX(100%)',
                                    zIndex: 2
                                }}
                            />
                        </div>

                        {/* Flight Details Section */}
                        <div
                            className="flex-1 px-6 py-2 flex items-center relative"
                            style={{
                                backgroundColor: '#FFFFFF',
                                height: '48px',
                                borderTopRightRadius: '8px',
                                borderBottomRightRadius: '8px'
                            }}
                        >
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-black text-base">{flight.airline}</span>
                                <span className="text-black text-base">(</span>
                                <span className="font-bold text-black text-base">{flight.flightNumber}</span>
                                <span className="text-black text-base">)</span>
                                <span className="text-black text-base ml-1">From</span>
                                <span className="font-bold text-black text-base ml-1">{flight.from}</span>
                                <span className="text-black text-base">(</span>
                                <span className="font-bold text-black text-base">{getAirportCode(flight.from)}</span>
                                <span className="text-black text-base">)</span>
                                <span className="text-black text-base ml-1">To</span>
                                <span className="font-bold text-black text-base ml-1">{flight.to}</span>
                                <span className="text-black text-base">(</span>
                                <span className="font-bold text-black text-base">{getAirportCode(flight.to)}</span>
                                <span className="text-black text-base">)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notes Section */}
            <div className="text-sm text-gray-600 pt-4 pb-4">
                <strong>Note:</strong> All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25kg Checked Baggage.
            </div>

            {/* Horizontal Line */}
            <hr className="border-t border-gray-300" />
        </div>
    );
};

export default PrintableFlightSummary;