import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableDayCard from './PrintableDayCard';
import TripOverview from './TripOverview';
import ItineraryHeader from './ItineraryHeader';
import PrintableFlightSummary from './PrintableFlightSummary';
import PrintableHotelBookings from './PrintableHotelBookings';
import PrintableImportantNotes from './PrintableImportantNotes';
import PrintableScopeOfService from './PrintableScopeOfService';
import PrintableInclusionSummary from './PrintableInclusionSummary';
import PrintableActivityTable from './PrintableActivityTable';
import PrintablePaymentPlan from './PrintablePaymentPlan';
import PrintableVisaDetails from './PrintableVisaDetails';
import logo from '../assets/logo.png';

const PDFContent = React.forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} style={{ maxWidth: '56rem', margin: '0 auto', padding: '48px 48px 200px 48px', backgroundColor: '#ffffff', position: 'relative' }}>
      <style jsx>{`
        @media print {
          @page {
            margin: 10mm 0 0 0;
            size: A4;
          }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-content {
            padding-bottom: 0;
          }
        }
      `}</style>

      <div className="page-content">
        <div style={{ marginTop: '20px' }}>
          <div className="text-center mb-8">
            <img src={logo} alt="Vigovia Logo" className="mx-auto" style={{ maxWidth: '200px' }} />
          </div>

          <ItineraryHeader formData={formData} />

          <TripOverview formData={formData} />

          {formData.days && formData.days.length > 0 && (
            <div className="mb-12">
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

          <PrintableFlightSummary flights={formData.flights} />

          <PrintableHotelBookings hotels={formData.hotels} />

          <PrintableImportantNotes importantNotes={formData.importantNotes} />

          <PrintableScopeOfService scopeOfService={formData.scopeOfService} />

          <PrintableInclusionSummary inclusionSummary={formData.inclusionSummary} />

          <PrintableActivityTable activityTable={formData.activityTable} />

          <div className="my-12">
            <h3 className="text-2xl font-bold text-black mb-4">
              Terms and <span style={{ color: '#9333EA' }}>Conditions</span>
            </h3>
            <a
              href="#"
              className="text-sm text-blue-700 underline"
              style={{ textDecoration: 'underline' }}
            >
              View all terms and conditions
            </a>
          </div>

          <PrintablePaymentPlan paymentPlan={formData.paymentPlan} />

          <PrintableVisaDetails visaDetails={formData.visaDetails} />

          <div className="text-center mt-16 mb-12">
            <h3 className="text-2xl font-bold color-purple mb-6">PLAN.PACK.GO!</h3>
            <button
              className="px-8 py-3 bg-purple text-white rounded-full text-lg font-semibold hover:bg-purple-800 transition"
              style={{ borderRadius: '50px' }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        padding: '24px 48px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '13px',
        lineHeight: '1.6',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px', maxWidth: '48rem', margin: '0 auto'}}>
          <div style={{ flex: '1' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 6px 0', fontSize: '14px', color: '#000' }}>
              Vigovia Tech Pvt. Ltd
            </p>
            <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '3px 0', color: '#333' }}>
              Registered Office: Hd-109 Cinnabar Hills,
            </p>
            <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '3px 0', color: '#333' }}>
              Links Business Park, Karnataka, India.
            </p>
          </div>

          <div style={{ flex: '1', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '3px 0', color: '#333' }}>
              <strong>Phone:</strong> +91-9504061112
            </p>
            <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '3px 0', color: '#333' }}>
              <strong>Email ID:</strong> Utkarsh@Vigovia.Com
            </p>
            <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '3px 0', color: '#333' }}>
              <strong>CIN:</strong> U79110KA2024PTC191890
            </p>
          </div>

          <div style={{ flex: '1', textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
            <img src={logo} alt="Vigovia Logo" style={{ height: '45px', objectFit: 'contain' }} />
            <p style={{ fontSize: '11px', marginTop: '4px', color: '#666', fontWeight: '600' }}>
              PLAN.PACK.GO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PDFContent.displayName = 'PDFContent';

const PDFPreview = ({ formData }) => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `${formData?.title || 'Itinerary'}_${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page {
        margin: 25.4mm 0 80mm 0;
        size: A4;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        #__next, html {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
    suppressEndMessage: true
  });

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <button
          onClick={handlePrint}
          className="px-8 py-3 bg-purple text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
        >
          Download Itinerary as PDF
        </button>
      </div>

      <div style={{ position: 'fixed', left: '-9999px', top: 0, width: '56rem' }}>
        <PDFContent ref={contentRef} formData={formData} />
      </div>

      <PDFContent formData={formData} />
    </div>
  );
};

export default PDFPreview;