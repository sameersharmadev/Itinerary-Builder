import React from 'react';
import PrintableDayCard from './PrintableDayCard';
import TripOverview from './TripOverview';
import ItineraryHeader from './ItineraryHeader';
import PrintableFlightSummary from './PrintableFlightSummary';
import PrintableHotelBookings from './PrintableHotelBookings';

const PDFPreview = ({ formData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 rounded-lg">
      <style jsx>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>

      {/* Itinerary Header */}
      <ItineraryHeader formData={formData} />

      {/* Trip Overview Component */}
      <TripOverview formData={formData} />

      {/* Daily Itinerary */}
      {formData.days && formData.days.length > 0 && (
        <div className="mb-8">
          {formData.days.map((day, index) => (
            <PrintableDayCard
              key={index}
              dayNumber={day.dayNumber}
              dayData={day}
              departureDate={formData.departure}
            />
          ))}
        </div>
      )}

      {/* Flight Summary */}
      <PrintableFlightSummary flights={formData.flights} />

      {/* Hotel Bookings - New Component */}
      <PrintableHotelBookings hotels={formData.hotels} />

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {formData.inclusions && formData.inclusions.some(item => item.trim()) && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-purple-800 mb-3">Inclusions</h3>
            <ul className="text-sm space-y-1">
              {formData.inclusions.filter(item => item.trim()).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        {formData.exclusions && formData.exclusions.some(item => item.trim()) && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-purple-800 mb-3">Exclusions</h3>
            <ul className="text-sm space-y-1">
              {formData.exclusions.filter(item => item.trim()).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Additional Notes */}
      {formData.notes && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold text-purple-800 mb-3">Additional Notes</h3>
          <p className="text-sm">{formData.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-4 mt-8">
        Generated on {new Date().toLocaleDateString()} • Vigovia Travel
      </div>
    </div>
  );
};

export default PDFPreview;