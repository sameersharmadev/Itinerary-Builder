import React from 'react';

const PrintableImportantNotes = ({ importantNotes }) => {
  if (!importantNotes || importantNotes.length === 0) {
    return null;
  }

  const getRowHeight = (note) => {
    const detailsLines = note.details.split('\n').length;
    const pointLines = note.point.split('\n').length;
    const maxLines = Math.max(detailsLines, pointLines);
    return Math.max(60, 32 + (maxLines * 20)); 
  };

  const isLastRow = (index) => index === importantNotes.length - 1;

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Important <span style={{ color: '#9333EA' }}>Notes</span>
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
            Point
          </div>
          <div>
            {importantNotes.map((note, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(note)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {note.point}
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="flex-[2]">
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
            {importantNotes.map((note, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(note)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                <div className="text-center">
                  {note.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PrintableImportantNotes;