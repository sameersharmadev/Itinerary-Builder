import React, { useRef, useEffect, useState } from 'react';

const PrintableDayCard = ({ dayNumber, dayData, departureDate }) => {
  const morningDotRef = useRef(null);
  const eveningDotRef = useRef(null);
  const timelineRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({});

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatInputDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return formatDate(date);
  };

  const getDisplayDate = () => {
    // First priority: Use the date entered by user for this specific day
    if (dayData?.date) {
      return formatInputDate(dayData.date);
    }
    
    // Second priority: Use displayDate if provided
    if (dayData?.displayDate) {
      return dayData.displayDate;
    }
    
    // Third priority: Calculate from departure date
    if (departureDate) {
      const newDate = new Date(departureDate);
      newDate.setDate(newDate.getDate() + (dayNumber - 1));
      return formatDate(newDate);
    }
    return `${dayNumber}th November`;
  };

  const displayDate = getDisplayDate();
  const description = dayData?.description || 'Singapore City Excursion';

  const formatActivities = (activities) => {
    if (!activities || activities.trim() === '') {
      return '';
    }
    
    const lines = activities.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => line.startsWith('•') ? line : `• ${line}`).join('\n');
  };

  useEffect(() => {
    const calculateLinePosition = () => {
      if (morningDotRef.current && eveningDotRef.current && timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const morningRect = morningDotRef.current.getBoundingClientRect();
        const eveningRect = eveningDotRef.current.getBoundingClientRect();
        const morningTop = morningRect.top - timelineRect.top + (morningRect.height / 2);
        const eveningTop = eveningRect.top - timelineRect.top + (eveningRect.height / 2);
        const dotCenterX = morningRect.left - timelineRect.left + (morningRect.width / 2);

        setLineStyle({
          position: 'absolute',
          left: `${dotCenterX}px`,
          top: `${morningTop}px`,
          height: `${eveningTop - morningTop}px`,
          width: '2px',
          backgroundColor: '#4A90E2',
          zIndex: 0,
        });
      }
    };

    calculateLinePosition();
    window.addEventListener('resize', calculateLinePosition);
    const timeout = setTimeout(calculateLinePosition, 100);

    return () => {
      window.removeEventListener('resize', calculateLinePosition);
      clearTimeout(timeout);
    };
  }, [dayData]); 

  return (
    <div className="flex items-stretch gap-16 py-8 border-b my-6 print:break-inside-avoid" style={{ borderColor: '#777' }}>
      <div className="bg-[#3C1D66] text-white rounded-4xl flex items-center py-5 min-h-[200px]">
        <span
          className="-rotate-90 transform whitespace-nowrap text-2xl font-medium"
          style={{ fontSize: "26px" }}
        >
          Day {dayNumber}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex gap-20 items-stretch">
          {/* Image and date section */}
          <div className="flex flex-col gap-1 items-center justify-center">
            <img
              src={`/src/assets/days_placeholder/day${dayNumber}.png`}
              alt={`Day ${dayNumber}`}
              className="rounded-lg"
              style={{ width: "216px", height: "216px", objectFit: "cover" }}
              onError={(e) => {
                // Fallback if image doesn't exist
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback div for when image fails to load */}
            <div 
              className="rounded-lg bg-sky-100 items-center justify-center hidden"
              style={{ width: "216px", height: "216px" }}
            >
              <span className="text-6xl text-sky-600">🏝️</span>
            </div>
            
            <div className="text-xl font-bold text-center text-gray-800 mt-2">
              {displayDate}
            </div>
            <div className="text-center text-gray-600">
              {description}
            </div>
          </div>

          {/* Timeline with activities */}
          <div ref={timelineRef} className="flex-1 relative flex flex-col justify-center">
            {/* Dynamic vertical line connecting dots */}
            <div style={lineStyle} />

            {/* Morning */}
            <div className="flex gap-4 items-start relative mb-2">
              <div
                ref={morningDotRef}
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "white", border: "4px solid #000000" }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-base text-gray-800">Morning</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line min-h-6">
                  {formatActivities(dayData?.morning) || (
                    <span className="text-gray-400 italic">No activities planned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex gap-4 items-start relative mb-2">
              <div
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "white", border: "4px solid #000000" }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-base text-gray-800">Afternoon</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line min-h-6">
                  {formatActivities(dayData?.afternoon) || (
                    <span className="text-gray-400 italic">No activities planned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Evening */}
            <div className="flex gap-4 items-start relative">
              <div
                ref={eveningDotRef}
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "white", border: "4px solid #000000" }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-base text-gray-800">Evening</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line min-h-6">
                  {formatActivities(dayData?.evening) || (
                    <span className="text-gray-400 italic">No activities planned</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableDayCard;