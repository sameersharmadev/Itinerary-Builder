import React, { useState, useRef, useEffect } from "react";

const DayCard = ({ dayNumber, dayData, departureDate }) => {
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  const [activities, setActivities] = useState({
    morning: "",
    afternoon: "",
    evening: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineOffset, setLineOffset] = useState(0);
  const timelineRef = useRef(null);

  const [displayDate, setDisplayDate] = useState(() => {
    if (dayData?.displayDate) return dayData.displayDate;
    if (departureDate) {
      const newDate = new Date(departureDate);
      newDate.setDate(newDate.getDate() + (dayNumber - 1));
      return formatDate(newDate);
    }
    return "";
  });
  const [description, setDescription] = useState(dayData?.description || "");

  useEffect(() => {
    const updateLineHeight = () => {
      if (timelineRef.current) {
        const container = timelineRef.current;
        const firstDot = container.querySelector('[data-dot="morning"]');
        const lastDot = container.querySelector('[data-dot="evening"]');
        
        if (firstDot && lastDot) {
          const firstDotRect = firstDot.getBoundingClientRect();
          const lastDotRect = lastDot.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          const topOffset = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
          const bottomOffset = lastDotRect.top - containerRect.top + lastDotRect.height / 2;
          
          setLineOffset(topOffset);
          setLineHeight(bottomOffset - topOffset);
        }
      }
    };

    updateLineHeight();
    const timer = setTimeout(updateLineHeight, 100);
    window.addEventListener('resize', updateLineHeight);
    
    const observer = new ResizeObserver(updateLineHeight);
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLineHeight);
      observer.disconnect();
    };
  }, [activities]);

  const adjustHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    setActivities((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setTimeout(() => {
      const container = timelineRef.current;
      if (container) {
        const firstDot = container.querySelector('[data-dot="morning"]');
        const lastDot = container.querySelector('[data-dot="evening"]');
        
        if (firstDot && lastDot) {
          const firstDotRect = firstDot.getBoundingClientRect();
          const lastDotRect = lastDot.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          const topOffset = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
          const bottomOffset = lastDotRect.top - containerRect.top + lastDotRect.height / 2;
          
          setLineOffset(topOffset);
          setLineHeight(bottomOffset - topOffset);
        }
      }
    }, 0);
  };

  const handleKeyDown = (timeOfDay, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const currentText = e.target.value;
      const newText =
        currentText.slice(0, cursorPosition) +
        "\n• " +
        currentText.slice(cursorPosition);

      setActivities((prev) => ({
        ...prev,
        [timeOfDay]: newText,
      }));

      setTimeout(() => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
        e.target.selectionStart = cursorPosition + 3;
        e.target.selectionEnd = cursorPosition + 3;
      }, 0);
    }
  };

  const handleFocus = (fieldName, e) => {
    setFocusedField(fieldName);
    // Add bullet point on focus if field is empty
    if (activities[fieldName].trim() === "") {
      setActivities((prev) => ({
        ...prev,
        [fieldName]: "• ",
      }));
      // Set cursor after bullet
      setTimeout(() => {
        e.target.selectionStart = 2;
        e.target.selectionEnd = 2;
      }, 0);
    }
  };

  const handleBlur = (fieldName) => {
    setFocusedField(null);
    // Remove bullet if nothing was typed
    if (activities[fieldName].trim() === "•") {
      setActivities((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  return (
    <div className="flex items-stretch gap-12 py-8 border-b my-6" style={{ borderColor: '#777' }}>
      {/* Left purple bar with day number */}
      <div className="bg-[#3C1D66] text-white rounded-4xl flex items-center">
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
            />
            <input
              type="text"
              value={displayDate}
              onChange={(e) => setDisplayDate(e.target.value)}
              placeholder="Add the date..."
              className="text-xl font-bold bg-transparent focus:outline-none text-center"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add day description..."
              className="text-center text-gray-600 bg-transparent focus:outline-none"
            />
          </div>

          {/* Timeline with activities */}
          <div ref={timelineRef} className="flex-1 relative flex flex-col justify-center">
            {/* Vertical line connecting dots */}
            <div
              className="absolute left-2 w-1 bg-blue-500 pointer-events-none"
              style={{
                top: `${lineOffset}px`,
                height: lineHeight > 0 ? `${lineHeight}px` : "0px",
                transition: "height 0.2s ease-out",
              }}
            ></div>

            {/* Morning */}
            <div className="flex gap-4 items-start relative">
              <div
                data-dot="morning"
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0"
                style={{ background: "white", border: "4px solid #000000" }}
              ></div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Morning</h4>
                <textarea
                  name="morning"
                  value={activities.morning}
                  onChange={adjustHeight}
                  onKeyDown={(e) => handleKeyDown("morning", e)}
                  onFocus={(e) => handleFocus("morning", e)}
                  onBlur={() => handleBlur("morning")}
                  placeholder="Press Enter to add activities..."
                  className="w-full bg-transparent focus:outline-none resize-none overflow-visible"
                  style={{ height: "auto", minHeight: "24px" }}
                />
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex gap-4 items-start">
              <div
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0"
                style={{ background: "white", border: "4px solid #000000" }}
              ></div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Afternoon</h4>
                <textarea
                  name="afternoon"
                  value={activities.afternoon}
                  onChange={adjustHeight}
                  onKeyDown={(e) => handleKeyDown("afternoon", e)}
                  onFocus={(e) => handleFocus("afternoon", e)}
                  onBlur={() => handleBlur("afternoon")}
                  placeholder="Press Enter to add activities..."
                  className="w-full bg-transparent focus:outline-none resize-none overflow-visible"
                  style={{ height: "auto", minHeight: "24px" }}
                />
              </div>
            </div>

            {/* Evening */}
            <div className="flex gap-4 items-start">
              <div
                data-dot="evening"
                className="w-5 h-5 rounded-full z-10 flex items-center justify-center flex-shrink-0"
                style={{ background: "white", border: "4px solid #000000" }}
              ></div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Evening</h4>
                <textarea
                  name="evening"
                  value={activities.evening}
                  onChange={adjustHeight}
                  onKeyDown={(e) => handleKeyDown("evening", e)}
                  onFocus={(e) => handleFocus("evening", e)}
                  onBlur={() => handleBlur("evening")}
                  placeholder="Press Enter to add activities..."
                  className="w-full bg-transparent focus:outline-none resize-none overflow-visible"
                  style={{ height: "auto", minHeight: "24px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
