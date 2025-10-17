import React, { useRef, useEffect, useState } from 'react';
import day1 from '../assets/days_placeholder/day1.png';
import day2 from '../assets/days_placeholder/day2.png';
import day3 from '../assets/days_placeholder/day3.png';

const PrintableDayCard = ({ dayNumber, dayData, departureDate }) => {
  const morningDotRef = useRef(null);
  const eveningDotRef = useRef(null);
  const timelineRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({});

  const dayImages = [day1, day2, day3];

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatInputDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return formatDate(date);
  };

  const getDisplayDate = () => {
    if (dayData?.date) {
      return formatInputDate(dayData.date);
    }
    if (dayData?.displayDate) {
      return dayData.displayDate;
    }
    if (departureDate) {
      const newDate = new Date(departureDate);
      newDate.setDate(newDate.getDate() + (dayNumber - 1));
      return formatDate(newDate);
    }
    return `${dayNumber}th Nov`;
  };

  const displayDate = getDisplayDate();
  const description = dayData?.description || 'City Excursion';

  const formatActivities = (activities) => {
    if (!activities || activities.trim() === '') {
      return '';
    }
    const lines = activities.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => line.startsWith('•') ? line : `• ${line}`).join('\n');
  };

  const getDayImage = () => {
    const imageIndex = (dayNumber - 1) % dayImages.length;
    return dayImages[imageIndex];
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
    <div className="flex items-stretch gap-8 py-8 border-b my-6 print:break-inside-avoid" style={{ borderColor: '#777' }}>
      <div className="bg-purple text-white rounded-4xl flex items-center min-h-[80px] w-12 flex-shrink-0">
        <span className="-rotate-90 transform whitespace-nowrap text-base font-bold" style={{ fontSize: "18px" }}>
          Day {dayNumber}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex gap-12 items-stretch">
          <div className="flex flex-col gap-1 items-center justify-center w-48 flex-shrink-0">
            <img
              src={getDayImage()}
              alt={`Day ${dayNumber}`}
              className="rounded-lg"
              style={{ width: "180px", height: "180px", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="rounded-lg bg-sky-100 items-center justify-center hidden" style={{ width: "120px", height: "120px" }}>
              <span className="text-5xl text-sky-600">🏝️</span>
            </div>
            <div className="text-lg font-bold text-center text-gray-800 mt-2">
              {displayDate}
            </div>
            <div className="text-sm text-center text-gray-600 line-clamp-2">
              {description}
            </div>
          </div>

          <div ref={timelineRef} className="flex-1 relative flex flex-col justify-center">
            <div style={lineStyle} />

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
                    <span className="text-gray-400 italic">No activities</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start relative mb-2">
              <div
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "white", border: "4px solid #000000" }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-base text-gray-800">Afternoon</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line min-h-6">
                  {formatActivities(dayData?.afternoon) || (
                    <span className="text-gray-400 italic">No activities</span>
                  )}
                </div>
              </div>
            </div>

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
                    <span className="text-gray-400 italic">No activities</span>
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