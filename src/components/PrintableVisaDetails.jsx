import React from 'react';

const PrintableVisaDetails = ({ visaDetails }) => {
  if (!visaDetails || visaDetails.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Visa <span style={{ color: '#9333EA' }}>Details</span>
      </h2>

      {/* Visa Details Section */}
      <div
        className="flex items-center justify-between p-3 px-16 bg-gray-50 rounded-full border"
        style={{
          borderRadius: '25px',
          border: '2px solid #541C9C',
          backgroundColor: '#FFF',
        }}
      >
        {/* Visa Type */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Visa Type :</span>
          <span className="text-sm text-gray-700">{visaDetails[0]?.visaType || 'Not specified'}</span>
        </div>

        {/* Validity */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Validity :</span>
          <span className="text-sm text-gray-700">{visaDetails[0]?.validity || 'Not specified'}</span>
        </div>

        {/* Processing Date */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Processing Date :</span>
          <span className="text-sm text-gray-700">{formatDate(visaDetails[0]?.processingDate) || 'Not specified'}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintableVisaDetails;