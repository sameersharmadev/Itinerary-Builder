import React from 'react';

const PrintableActivityTable = ({ activityTable }) => {
  if (!activityTable || activityTable.length === 0) {
    return null;
  }
  const getRowHeight = (activity) => {
    const cityLines = activity.city.split('\n').length;
    const activityLines = activity.activity.split('\n').length;
    const typeLines = activity.type.split('\n').length;
    const timeLines = activity.timeRequired.split('\n').length;
    const maxLines = Math.max(cityLines, activityLines, typeLines, timeLines);
    return Math.max(60, 32 + (maxLines * 20));
  };

  const isLastRow = (index) => index === activityTable.length - 1;

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Activity <span style={{ color: '#9333EA' }}>Table</span>
      </h2>

      <div className="mb-6 flex gap-2">
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
            {activityTable.map((activity, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(activity)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {activity.city}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Activity
          </div>
          <div>
            {activityTable.map((activity, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(activity)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {activity.activity}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Type
          </div>
          <div>
            {activityTable.map((activity, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(activity)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {activity.type}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Time Required
          </div>
          <div>
            {activityTable.map((activity, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(activity)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {activity.timeRequired}
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PrintableActivityTable;