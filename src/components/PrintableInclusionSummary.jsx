import React from 'react';

const PrintableInclusionSummary = ({ inclusionSummary }) => {
  if (!inclusionSummary || inclusionSummary.length === 0) {
    return null;
  }

  const getRowHeight = (item) => {
    const categoryLines = item.category.split('\n').length;
    const countLines = item.count.toString().split('\n').length;
    const detailsLines = item.details.split('\n').length;
    const commentsLines = item.comments.split('\n').length;
    const maxLines = Math.max(categoryLines, countLines, detailsLines, commentsLines);
    return Math.max(60, 32 + (maxLines * 20)); 
  };

  const isLastRow = (index) => index === inclusionSummary.length - 1;

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Inclusion <span style={{ color: '#9333EA' }}>Summary</span>
      </h2>

      {/* Table with separate columns */}
      <div className="mb-6 flex gap-2">
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Category
          </div>
          <div>
            {inclusionSummary.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(item)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {item.category}
              </div>
            ))}
          </div>
        </div>

        {/* Count Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Count
          </div>
          <div>
            {inclusionSummary.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(item)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {item.count}
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Details
          </div>
          <div>
            {inclusionSummary.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(item)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {item.details}
              </div>
            ))}
          </div>
        </div>

        {/* Comments Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Comments
          </div>
          <div>
            {inclusionSummary.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(item)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {item.comments}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transfer Policy Section */}
      <div className="">
        <h3 className="text-xs font-bold text-black">Transfer Policy (Refundable Upon Claim)</h3>
        <p className="text-xs text-gray-700">
          If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.
        </p>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-300 mt-6" />
    </div>
  );
};

export default PrintableInclusionSummary;